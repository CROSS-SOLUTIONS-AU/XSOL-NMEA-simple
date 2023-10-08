"use strict";
/*
 * === PRDID - RDI proprietary heading, pitch, and roll ===
 *
 * ------------------------------------------------------------------------------
 *        1   2   3   4
 *        |   |   |   |
 * $PRDID,x.x,x.x,x.x*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Roll
 * 2. Pitch
 * 3. Heading
 * 4. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "RDID";
exports.sentenceName = "RDI proprietary heading, pitch, and roll";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        roll: helpers_1.parseFloatSafe(fields[1]),
        pitch: helpers_1.parseFloatSafe(fields[2]),
        heading: helpers_1.parseFloatSafe(fields[3])
    };
}
exports.decodeSentence = decodeSentence;
