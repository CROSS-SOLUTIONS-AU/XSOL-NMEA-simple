"use strict";
// Copied from from https://github.com/nherment/node-nmea/blob/master/lib/Helper.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDatetime = exports.parseTime = exports.parseLongitude = exports.parseLatitude = exports.parseNumberOrString = exports.parseIntSafe = exports.parseFloatSafe = exports.encodeValue = exports.encodeTime = exports.encodeDate = exports.encodeDegrees = exports.encodeGeoidalSeperationNoUnits = exports.encodeGeoidalSeperation = exports.encodeAltitudeNoUnits = exports.encodeAltitude = exports.encodeLongitude = exports.encodeLatitude = exports.encodeFixed = exports.createNmeaChecksumFooter = exports.computeNmeaChecksum = exports.validNmeaChecksum = exports.padLeft = exports.toHexString = void 0;
var m_hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
function toHexString(v) {
    var msn = (v >> 4) & 0x0f;
    var lsn = (v >> 0) & 0x0f;
    return m_hex[msn] + m_hex[lsn];
}
exports.toHexString = toHexString;
function padLeft(value, length, paddingCharacter) {
    var result = typeof value === "string" ? value : value.toFixed(0);
    while (result.length < length) {
        result = paddingCharacter + result;
    }
    return result;
}
exports.padLeft = padLeft;
// =========================================
// checksum related functions
// =========================================
/**
 * Checks that the given NMEA sentence has a valid checksum.
 */
function validNmeaChecksum(nmeaSentence) {
    var _a = nmeaSentence.split("*"), sentenceWithoutChecksum = _a[0], checksumString = _a[1];
    var correctChecksum = computeNmeaChecksum(sentenceWithoutChecksum);
    // checksum is a 2 digit hex value
    var actualChecksum = parseInt(checksumString, 16);
    return correctChecksum === actualChecksum;
}
exports.validNmeaChecksum = validNmeaChecksum;
/**
 * Generate a checksum for an NMEA sentence without the trailing "*xx".
 */
function computeNmeaChecksum(sentenceWithoutChecksum) {
    // init to first character value after the $
    var checksum = sentenceWithoutChecksum.charCodeAt(1);
    // process rest of characters, zero delimited
    for (var i = 2; i < sentenceWithoutChecksum.length; i += 1) {
        checksum = checksum ^ sentenceWithoutChecksum.charCodeAt(i);
    }
    // checksum is between 0x00 and 0xff
    checksum = checksum & 0xff;
    return checksum;
}
exports.computeNmeaChecksum = computeNmeaChecksum;
/**
 * Generate the correct trailing "*xx" footer for an NMEA sentence.
 */
function createNmeaChecksumFooter(sentenceWithoutChecksum) {
    return "*" + toHexString(computeNmeaChecksum(sentenceWithoutChecksum));
}
exports.createNmeaChecksumFooter = createNmeaChecksumFooter;
// =========================================
// field encoders
// =========================================
function encodeFixed(value, decimalPlaces) {
    if (value === undefined) {
        return "";
    }
    return value.toFixed(decimalPlaces);
}
exports.encodeFixed = encodeFixed;
/**
 * Encodes the latitude in the standard NMEA format "ddmm.mmmmmm".
 *
 * @param latitude Latitude in decimal degrees.
 */
function encodeLatitude(latitude) {
    if (latitude === undefined) {
        return ",";
    }
    var hemisphere;
    if (latitude < 0) {
        hemisphere = "S";
        latitude = -latitude;
    }
    else {
        hemisphere = "N";
    }
    // get integer degrees
    var d = Math.floor(latitude);
    // latitude degrees are always 2 digits
    var s = padLeft(d, 2, "0");
    // get fractional degrees
    var f = latitude - d;
    // convert to fractional minutes
    var m = (f * 60.0);
    // format the fixed point fractional minutes "mm.mmmmmm"
    var t = padLeft(m.toFixed(6), 9, "0");
    s = s + t + "," + hemisphere;
    return s;
}
exports.encodeLatitude = encodeLatitude;
/**
 * Encodes the longitude in the standard NMEA format "dddmm.mmmmmm".
 *
 * @param longitude Longitude in decimal degrees.
 */
function encodeLongitude(longitude) {
    if (longitude === undefined) {
        return ",";
    }
    var hemisphere;
    if (longitude < 0) {
        hemisphere = "W";
        longitude = -longitude;
    }
    else {
        hemisphere = "E";
    }
    // get integer degrees
    var d = Math.floor(longitude);
    // longitude degrees are always 3 digits
    var s = padLeft(d, 3, "0");
    // get fractional degrees
    var f = longitude - d;
    // convert to fractional minutes and round up to the specified precision
    var m = (f * 60.0);
    // format the fixed point fractional minutes "mm.mmmmmm"
    var t = padLeft(m.toFixed(6), 9, "0");
    s = s + t + "," + hemisphere;
    return s;
}
exports.encodeLongitude = encodeLongitude;
// 1 decimal, always meters
function encodeAltitude(alt) {
    if (alt === undefined) {
        return ",";
    }
    return alt.toFixed(1) + ",M";
}
exports.encodeAltitude = encodeAltitude;
// Some encodings don't want the unit
function encodeAltitudeNoUnits(alt) {
    if (alt === undefined) {
        return "";
    }
    return alt.toFixed(1);
}
exports.encodeAltitudeNoUnits = encodeAltitudeNoUnits;
// 1 decimal, always meters
function encodeGeoidalSeperation(geoidalSep) {
    if (geoidalSep === undefined) {
        return ",";
    }
    return geoidalSep.toFixed(1) + ",M";
}
exports.encodeGeoidalSeperation = encodeGeoidalSeperation;
// Some encodings don't want the unit
function encodeGeoidalSeperationNoUnits(geoidalSep) {
    if (geoidalSep === undefined) {
        return "";
    }
    return geoidalSep.toFixed(1);
}
exports.encodeGeoidalSeperationNoUnits = encodeGeoidalSeperationNoUnits;
// degrees
function encodeDegrees(degrees) {
    if (degrees === undefined) {
        return "";
    }
    return padLeft(degrees.toFixed(2), 6, "0");
}
exports.encodeDegrees = encodeDegrees;
function encodeDate(date) {
    if (date === undefined) {
        return "";
    }
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    return padLeft(day, 2, "0") + padLeft(month, 2, "0") + year.toFixed(0).substr(2);
}
exports.encodeDate = encodeDate;
function encodeTime(date) {
    if (date === undefined) {
        return "";
    }
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();
    return padLeft(hours, 2, "0") + padLeft(minutes, 2, "0") + padLeft(seconds, 2, "0");
}
exports.encodeTime = encodeTime;
function encodeValue(value) {
    if (value === undefined) {
        return "";
    }
    return value.toString();
}
exports.encodeValue = encodeValue;
// =========================================
// field traditionalDecoders
// =========================================
/**
 * Parse the given string to a float, returning 0 for an empty string.
 */
function parseFloatSafe(str) {
    if (str === "") {
        return 0.0;
    }
    return parseFloat(str);
}
exports.parseFloatSafe = parseFloatSafe;
/**
 * Parse the given string to a integer, returning 0 for an empty string.
 */
function parseIntSafe(i) {
    if (i === "") {
        return 0;
    }
    return parseInt(i, 10);
}
exports.parseIntSafe = parseIntSafe;
/**
 * Parse the given string to a float if possible, returning 0 for an undefined
 * value and a string the the given string cannot be parsed.
 */
function parseNumberOrString(str) {
    if (str === undefined) {
        return "";
    }
    var num = parseFloat(str);
    return isNaN(num) ? str : num;
}
exports.parseNumberOrString = parseNumberOrString;
/**
 * Parses latitude given as "ddmm.mm", "dmm.mm" or "mm.mm" (assuming zero
 * degrees) along with a given hemisphere of "N" or "S" into decimal degrees,
 * where north is positive and south is negetive.
 */
function parseLatitude(lat, hemi) {
    var hemisphere = (hemi === "N") ? 1.0 : -1.0;
    var a = lat.split(".");
    var degrees;
    var minutes;
    if (a[0].length === 4) {
        // two digits of degrees
        degrees = lat.substring(0, 2);
        minutes = lat.substring(2);
    }
    else if (a[0].length === 3) {
        // 1 digit of degrees (in case no leading zero)
        degrees = lat.substring(0, 1);
        minutes = lat.substring(1);
    }
    else {
        // no degrees, just minutes (nonstandard but a buggy unit might do this)
        degrees = "0";
        minutes = lat;
    }
    return (parseFloat(degrees) + (parseFloat(minutes) / 60.0)) * hemisphere;
}
exports.parseLatitude = parseLatitude;
/**
 * Parses latitude given as "dddmm.mm", "ddmm.mm", "dmm.mm" or "mm.mm" (assuming
 * zero degrees) along with a given hemisphere of "E" or "W" into decimal
 * degrees, where east is positive and west is negetive.
 */
function parseLongitude(lon, hemi) {
    var h = (hemi === "E") ? 1.0 : -1.0;
    var a = lon.split(".");
    var degrees;
    var minutes;
    if (a[0].length === 5) {
        // three digits of degrees
        degrees = lon.substring(0, 3);
        minutes = lon.substring(3);
    }
    else if (a[0].length === 4) {
        // 2 digits of degrees (in case no leading zero)
        degrees = lon.substring(0, 2);
        minutes = lon.substring(2);
    }
    else if (a[0].length === 3) {
        // 1 digit of degrees (in case no leading zero)
        degrees = lon.substring(0, 1);
        minutes = lon.substring(1);
    }
    else {
        // no degrees, just minutes (nonstandard but a buggy unit might do this)
        degrees = "0";
        minutes = lon;
    }
    return (parseFloat(degrees) + (parseFloat(minutes) / 60.0)) * h;
}
exports.parseLongitude = parseLongitude;
/**
 * Parses a UTC time and optionally a date and returns a Date
 * object.
 * @param {String} time Time the format "hhmmss" or "hhmmss.ss"
 * @param {String=} date Optional date in format the ddmmyyyy or ddmmyy
 * @returns {Date}
 */
function parseTime(time, date) {
    if (time === "") {
        return new Date(0);
    }
    var ret = new Date();
    if (date) {
        var year = date.slice(4);
        var month = parseInt(date.slice(2, 4), 10) - 1;
        var day = date.slice(0, 2);
        if (year.length === 4) {
            ret.setUTCFullYear(Number(year), Number(month), Number(day));
        }
        else {
            // If we need to parse older GPRMC data, we should hack something like
            // year < 73 ? 2000+year : 1900+year
            // Since GPS appeared in 1973
            ret.setUTCFullYear(Number("20" + year), Number(month), Number(day));
        }
    }
    ret.setUTCHours(Number(time.slice(0, 2)));
    ret.setUTCMinutes(Number(time.slice(2, 4)));
    ret.setUTCSeconds(Number(time.slice(4, 6)));
    // Extract the milliseconds, since they can be not present, be 3 decimal place, or 2 decimal places, or other?
    var msStr = time.slice(7);
    var msExp = msStr.length;
    var ms = 0;
    if (msExp !== 0) {
        ms = parseFloat(msStr) * Math.pow(10, 3 - msExp);
    }
    ret.setUTCMilliseconds(Number(ms));
    return ret;
}
exports.parseTime = parseTime;
/**
 * Parses a date in the format "yyMMdd" along with a time in the format
 * "hhmmss" or "hhmmss.ss" and returns a Date object.
 */
function parseDatetime(date, time) {
    var day = parseInt(date.slice(0, 2), 10);
    var month = parseInt(date.slice(2, 4), 10);
    var year = parseInt(date.slice(4, 6), 10);
    // GPRMC date doesn't specify century. GPS came out in 1973 so if the year
    // is less than 73, assume it's 20xx, otherwise assume it is 19xx.
    if (year < 73) {
        year = year + 2000;
    }
    else {
        year = year + 1900;
    }
    var hours = parseInt(time.slice(0, 2), 10);
    var minutes = parseInt(time.slice(2, 4), 10);
    var seconds = parseInt(time.slice(4, 6), 10);
    var milliseconds = 0;
    if (time.length === 9) {
        milliseconds = parseInt(time.slice(7, 9), 10) * 10;
    }
    return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds));
}
exports.parseDatetime = parseDatetime;
