"use strict";
/*
 * === RMC - Recommended minimum navigation information ===
 *
 * ------------------------------------------------------------------------------
 *                                                              12
 *        1         2 3       4 5        6 7   8   9      10  11|  13
 *        |         | |       | |        | |   |   |      |   | |  |
 * $--RMC,hhmmss.ss,A,llll.ll,a,yyyyy.yy,a,x.x,x.x,ddmmyy,x.x,a,m,*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. UTC Time
 * 2. Status
 *    A = Valid
 *    V = Navigation receiver warning
 * 3. Latitude
 * 4. N or S
 * 5. Longitude
 * 6. E or W
 * 7. Speed over ground, knots
 * 8. Track made good, degrees true
 * 9. Date, ddmmyy
 * 10. Magnetic Variation, degrees
 * 11. E or W
 * 12. FAA mode indicator (NMEA 2.3 and later)
 * 13. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "RMC";
exports.sentenceName = "Recommended minimum navigation information";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        datetime: helpers_1.parseDatetime(fields[9], fields[1]),
        status: fields[2] === "A" ? "valid" : "warning",
        latitude: helpers_1.parseLatitude(fields[3], fields[4]),
        longitude: helpers_1.parseLongitude(fields[5], fields[6]),
        speedKnots: helpers_1.parseFloatSafe(fields[7]),
        trackTrue: helpers_1.parseFloatSafe(fields[8]),
        variation: helpers_1.parseFloatSafe(fields[10]),
        variationPole: fields[11] === "E" ? "E" : fields[11] === "W" ? "W" : "",
        faaMode: fields[12]
    };
}
exports.decodeSentence = decodeSentence;
