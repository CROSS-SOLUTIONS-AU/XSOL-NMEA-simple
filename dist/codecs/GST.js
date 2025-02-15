"use strict";
/*
 * === GST - GPS pseudorange noise statistics ===
 *
 * ------------------------------------------------------------------------------
 *        1         2   3   4   5   6   7   8    9
 *        |         |   |   |   |   |   |   |    |
 * $--GST,hhmmss.ss,x.x,x.x,x.x,x.x,x.x,x.x,x.x,*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. UTC time of associated GGA fix
 * 2. RMS value of the standard deviation of the range inputs to the navigation
 *    process (range inputs include pseudoranges and DGPS corrections)
 * 3. Standard deviation of semi-major axis of error ellipse, meters
 * 4. Standard deviation of semi-minor axis of error ellipse, meters
 * 5. Orientation of semi-major axis of error ellipse, degrees from true north
 * 6. Standard deviation of latitude error, meters
 * 7. Standard deviation of longitude error, meters
 * 8. Standard deviation of altitude error, meters
 * 9. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "GST";
exports.sentenceName = "GPS pseudorange noise statistics";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        time: helpers_1.parseTime(fields[1]),
        totalRms: helpers_1.parseFloatSafe(fields[2]),
        semiMajorError: helpers_1.parseFloatSafe(fields[3]),
        semiMinorError: helpers_1.parseFloatSafe(fields[4]),
        orientationOfSemiMajorError: helpers_1.parseFloatSafe(fields[5]),
        latitudeError: helpers_1.parseFloatSafe(fields[6]),
        longitudeError: helpers_1.parseFloatSafe(fields[7]),
        altitudeError: helpers_1.parseFloatSafe(fields[8])
    };
}
exports.decodeSentence = decodeSentence;
