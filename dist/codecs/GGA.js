"use strict";
/*
 * === GGA - Global positioning system fix data ===
 *
 * ------------------------------------------------------------------------------
 *                                                      11
 *        1         2       3 4        5 6 7  8   9  10 |  12 13  14   15
 *        |         |       | |        | | |  |   |   | |   | |   |    |
 * $--GGA,hhmmss.ss,llll.ll,a,yyyyy.yy,a,x,xx,x.x,x.x,M,x.x,M,x.x,xxxx*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Time (UTC)
 * 2. Latitude
 * 3. N or S (North or South)
 * 4. Longitude
 * 5. E or W (East or West)
 * 6. GPS Quality Indicator,
 *    0 - fix not available,
 *    1 - GPS fix,
 *    2 - Differential GPS fix
 *    3 = PPS fix
 *    4 = Real Time Kinematic
 *    5 = Float RTK
 *    6 = Estimated (dead reckoning)
 *    7 = Manual input mode
 *    8 = Simulation mode
 * 7. Number of satellites in view, 00 - 12
 * 8. Horizontal Dilution of precision
 * 9. Antenna Altitude above/below mean-sea-level (geoid)
 * 10. Units of antenna altitude, meters
 * 11. Geoidal separation, the difference between the WGS-84 earth
 *     ellipsoid and mean-sea-level (geoid), "-" means mean-sea-level below ellipsoid
 * 12. Units of geoidal separation, meters
 * 13. Age of differential GPS data, time in seconds since last SC104
 *     type 1 or 9 update, null field when DGPS is not used
 * 14. Differential reference station ID, 0000-1023
 * 15. Checksum
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePacket = exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "GGA";
exports.sentenceName = "Global positioning system fix data";
var FixTypes = ["none", "fix", "delta", "pps", "rtk", "frtk", "estimated", "manual", "simulation"];
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        time: helpers_1.parseTime(fields[1]),
        latitude: helpers_1.parseLatitude(fields[2], fields[3]),
        longitude: helpers_1.parseLongitude(fields[4], fields[5]),
        fixType: FixTypes[helpers_1.parseIntSafe(fields[6])],
        satellitesInView: helpers_1.parseIntSafe(fields[7]),
        horizontalDilution: helpers_1.parseFloatSafe(fields[8]),
        altitudeMeters: helpers_1.parseFloatSafe(fields[9]),
        geoidalSeperation: helpers_1.parseFloatSafe(fields[11]),
        differentialAge: helpers_1.parseFloatSafe(fields[13]),
        differentialRefStn: fields[14]
    };
}
exports.decodeSentence = decodeSentence;
function encodePacket(packet, talker) {
    var result = ["$" + talker + exports.sentenceId];
    result.push(helpers_1.encodeTime(packet.time));
    result.push(helpers_1.encodeLatitude(packet.latitude));
    result.push(helpers_1.encodeLongitude(packet.longitude));
    result.push(helpers_1.encodeValue(FixTypes.indexOf(packet.fixType)));
    result.push(helpers_1.encodeValue(packet.satellitesInView));
    result.push(helpers_1.encodeFixed(packet.horizontalDilution, 1));
    result.push(helpers_1.encodeAltitude(packet.altitudeMeters));
    result.push(helpers_1.encodeGeoidalSeperation(packet.geoidalSeperation));
    result.push(helpers_1.encodeFixed(packet.differentialAge, 2));
    result.push(helpers_1.encodeValue(packet.differentialRefStn));
    var resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + helpers_1.createNmeaChecksumFooter(resultWithoutChecksum);
}
exports.encodePacket = encodePacket;
