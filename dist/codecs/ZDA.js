"use strict";
/*
 * === ZDA - Time & Date - UTC, day, month, year and local time zone ===
 *
 * ------------------------------------------------------------------------------
 *	      1         2  3  4    5  6  7
 *        |         |  |  |    |  |  |
 * $--ZDA,hhmmss.ss,dd,mm,yyyy,zz,zz*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. UTC time (hours, minutes, seconds, may have fractional subsecond)
 * 2. Day, 01 to 31
 * 3. Month, 01 to 12
 * 4. Year (4 digits)
 * 5. Local zone description, 00 to +- 13 hours
 * 6. Local zone minutes description, 00 to 59, apply same sign as local hours
 * 7. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "ZDA";
exports.sentenceName = "UTC, day, month, year, and local time zone";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        datetime: helpers_1.parseTime(fields[1], fields.slice(2, 5).join("")),
        localZoneHours: helpers_1.parseIntSafe(fields[5]),
        localZoneMinutes: helpers_1.parseIntSafe(fields[6])
    };
}
exports.decodeSentence = decodeSentence;
