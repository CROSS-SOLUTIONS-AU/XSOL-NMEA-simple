"use strict";
/*
 * === GNS - GNSS fix data ===
 *
 * ------------------------------------------------------------------------------
 *                                                        11
 *        1         2       3 4        5 6 7  8   9  10   |    12  13
 *        |         |       | |        | | |  |   |   |   |    |   |
 * $--GNS,hhmmss.ss,llll.ll,N,yyyyy.yy,W,x,xx,x.x,x.x,x.x,null,xxxx*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Time (UTC)
 * 2. Latitude
 * 3. N or S (North or South)
 * 4. Longitude
 * 5. E or W (East or West)
 * 6. Mode Indicator - Variable Length,
 *    N - fix not available,
 *    A - GPS fix,
 *    D - Differential GPS fix
 *    P = PPS fix
 *    R = Real Time Kinematic
 *    F = Float RTK
 *    E = Estimated (dead reckoning)
 *    M = Manual input mode
 *    S = Simulation mode
 * 7. Number of satellites in view, 00 - 12
 * 8. Horizontal Dilution of precision
 * 9. Orthometric height in meters (MSL reference)
 * 10. Geoidal separation in meters - the difference between the earth ellipsoid surface and mean-sea-level (geoid) surface
 *     defined by the reference datum used in the position solution
 * 11. Age of differential data - Null if talker ID is GN, additional GNS messages follow with GP and/or GL Age of differential data
 * 12. Reference station ID1, range 0000-4095
 * 13. Checksum
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePacket = exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "GNS";
exports.sentenceName = "GNSS fix data";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        time: helpers_1.parseTime(fields[1]),
        latitude: helpers_1.parseLatitude(fields[2], fields[3]),
        longitude: helpers_1.parseLongitude(fields[4], fields[5]),
        modeIndicator: fields[6],
        satellitesInView: helpers_1.parseIntSafe(fields[7]),
        horizontalDilution: helpers_1.parseFloatSafe(fields[8]),
        altitudeMeters: helpers_1.parseFloatSafe(fields[9]),
        geoidalSeperation: helpers_1.parseFloatSafe(fields[10]),
        differentialAge: helpers_1.parseFloatSafe(fields[11]),
        differentialRefStn: fields[12]
    };
}
exports.decodeSentence = decodeSentence;
function encodePacket(packet, talker) {
    var result = ["$" + talker + exports.sentenceId];
    result.push(helpers_1.encodeTime(packet.time));
    result.push(helpers_1.encodeLatitude(packet.latitude));
    result.push(helpers_1.encodeLongitude(packet.longitude));
    result.push(packet.modeIndicator);
    result.push(helpers_1.encodeValue(packet.satellitesInView));
    result.push(helpers_1.encodeFixed(packet.horizontalDilution, 1));
    result.push(helpers_1.encodeAltitudeNoUnits(packet.altitudeMeters));
    result.push(helpers_1.encodeGeoidalSeperationNoUnits(packet.geoidalSeperation));
    result.push(helpers_1.encodeFixed(packet.differentialAge, 2));
    result.push(helpers_1.encodeValue(packet.differentialRefStn));
    var resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + helpers_1.createNmeaChecksumFooter(resultWithoutChecksum);
}
exports.encodePacket = encodePacket;
