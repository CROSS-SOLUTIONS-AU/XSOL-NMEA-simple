"use strict";
/*
 * === DBT - Depth below transducer ===
 *
 * ------------------------------------------------------------------------------
 *        1   2 3   4 5   6 7
 *        |   | |   | |   | |
 * $--DBT,x.x,f,x.x,M,x.x,F*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Depth, feet
 * 2. f = feet
 * 3. Depth, meters
 * 4. M = meters
 * 5. Depth, Fathoms
 * 6. F = Fathoms
 * 7. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePacket = exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "DBT";
exports.sentenceName = "Depth below transducer";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        depthFeet: helpers_1.parseFloatSafe(fields[1]),
        depthMeters: helpers_1.parseFloatSafe(fields[3]),
        depthFathoms: helpers_1.parseFloatSafe(fields[5])
    };
}
exports.decodeSentence = decodeSentence;
function encodePacket(packet, talker) {
    var result = ["$" + talker + exports.sentenceId];
    result.push(helpers_1.encodeFixed(packet.depthFeet, 2));
    result.push("f");
    result.push(helpers_1.encodeFixed(packet.depthMeters, 2));
    result.push("M");
    result.push(helpers_1.encodeFixed(packet.depthFathoms, 2));
    result.push("F");
    var resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + helpers_1.createNmeaChecksumFooter(resultWithoutChecksum);
}
exports.encodePacket = encodePacket;
