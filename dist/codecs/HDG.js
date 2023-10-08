"use strict";
/*
 * === HDG - Heading - deviation and variation ===
 *
 * ------------------------------------------------------------------------------
 *        1   2   3 4   5 6
 *        |   |   | |   | |
 * $--HDG,x.x,x.x,a,x.x,a*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Magnetic Sensor heading in degrees
 * 2. Magnetic Deviation, degrees
 * 3. Magnetic Deviation direction, E = Easterly, W = Westerly
 * 4. Magnetic Variation, degrees
 * 5. Magnetic Variation direction, E = Easterly, W = Westerly
 * 6. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "HDG";
exports.sentenceName = "Heading - deviation and variation";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        heading: helpers_1.parseFloatSafe(fields[1]),
        deviation: helpers_1.parseFloatSafe(fields[2]),
        deviationDirection: fields[3] === "E" ? "E" : fields[3] === "W" ? "W" : "",
        variation: helpers_1.parseFloatSafe(fields[4]),
        variationDirection: fields[5] === "E" ? "E" : fields[5] === "W" ? "W" : ""
    };
}
exports.decodeSentence = decodeSentence;
