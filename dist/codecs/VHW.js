"use strict";
/*
 * === VHW – Water speed and heading ===
 *
 * ------------------------------------------------------------------------------
 *        1   2 3   4 5   6 7   8 9
 *        |   | |   | |   | |   | |
 * $--VHW,x.x,T,x.x,M,x.x,N,x.x,K*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Degress True
 * 2. T = True
 * 3. Degrees Magnetic
 * 4. M = Magnetic
 * 5. Knots (speed of vessel relative to the water)
 * 6. N = Knots
 * 7. Kilometers (speed of vessel relative to the water)
 * 8. K = Kilometers
 * 9. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "VHW";
exports.sentenceName = "Water speed and heading";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        degreesTrue: helpers_1.parseFloatSafe(fields[1]),
        degreesMagnetic: helpers_1.parseFloatSafe(fields[3]),
        speedKnots: helpers_1.parseFloatSafe(fields[5]),
        speedKmph: helpers_1.parseFloatSafe(fields[7])
    };
}
exports.decodeSentence = decodeSentence;
