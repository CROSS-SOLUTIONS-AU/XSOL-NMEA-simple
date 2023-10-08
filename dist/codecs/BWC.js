"use strict";
/*
 * === BWC - Bearing and distance to waypoint - great circle ===
 *
 * ------------------------------------------------------------------------------
 *                                                         12
 *        1         2       3 4        5 6   7 8   9 10  11|    13 14
 *        |         |       | |        | |   | |   | |   | |    |  |
 * $--BEC,hhmmss.ss,llll.ll,a,yyyyy.yy,a,x.x,T,x.x,M,x.x,N,c--c,m,*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. UTC time
 * 2. Waypoint Latitude
 * 3. N = North, S = South
 * 4. Waypoint Longitude
 * 5. E = East, W = West
 * 6. Bearing, True
 * 7. T = True
 * 8. Bearing, Magnetic
 * 9. M = Magnetic
 * 10. Nautical Miles
 * 11. N = Nautical Miles
 * 12. Waypoint ID
 * 13. FAA mode indicator (NMEA 2.3 and later, optional)
 * 14. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "BWC";
exports.sentenceName = "Bearing and distance to waypoint - great circle";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        time: helpers_1.parseTime(fields[1]),
        bearingLatitude: helpers_1.parseLatitude(fields[2], fields[3]),
        bearingLongitude: helpers_1.parseLongitude(fields[4], fields[5]),
        bearingTrue: helpers_1.parseFloatSafe(fields[6]),
        bearingMagnetic: helpers_1.parseFloatSafe(fields[8]),
        distanceNm: helpers_1.parseFloatSafe(fields[10]),
        waypointId: fields[12],
        faaMode: fields[13]
    };
}
exports.decodeSentence = decodeSentence;
