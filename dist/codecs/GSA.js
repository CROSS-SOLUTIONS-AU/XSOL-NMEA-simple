"use strict";
/*
 * === GSA - Active satellites and dilution of precision ===
 *
 * ------------------------------------------------------------------------------
 *         1 2 3  4  5  6  7  8  9  10 11 12 13 14 15  16  17  18
 *         | | |  |  |  |  |  |  |  |  |  |  |  |  |   |   |   |
 *  $--GSA,a,x,xx,xx,xx,xx,xx,xx,xx,xx,xx,xx,xx,xx,x.x,x.x,x.x*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 *
 * 1. Selection of 2D or 3D fix
 *    A - Automatic
 *    M - Manual, forced to operate in 2D or 3D
 * 2. 3D fix
 *    1 - no fix
 *    2 - 2D fix
 *    3 - 3D fix
 * 3. PRN of satellite used for fix (may be blank)
 * ...
 * 14. PRN of satellite used for fix (may be blank)
 * 15. Dilution of precision
 * 16. Horizontal dilution of precision
 * 17. Vertical dilution of precision
 * 18. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "GSA";
exports.sentenceName = "Active satellites and dilution of precision";
var ThreeDFixTypes = ["unknown", "none", "2D", "3D"];
function decodeSentence(fields) {
    var sats = [];
    for (var i = 3; i < 15; i++) {
        if (fields[i]) {
            sats.push(+fields[i]);
        }
    }
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        selectionMode: fields[1] === "A" ? "automatic" : "manual",
        fixMode: ThreeDFixTypes[helpers_1.parseIntSafe(fields[2])],
        satellites: sats,
        PDOP: helpers_1.parseFloatSafe(fields[15]),
        HDOP: helpers_1.parseFloatSafe(fields[16]),
        VDOP: helpers_1.parseFloatSafe(fields[17])
    };
}
exports.decodeSentence = decodeSentence;
