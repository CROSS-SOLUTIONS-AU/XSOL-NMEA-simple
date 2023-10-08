"use strict";
/*
 * === HDT - Heading - true ===
 *
 * ------------------------------------------------------------------------------
 *        1   2 3
 *        |   | |
 * $--HDT,x.x,T*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Heading degrees, true
 * 2. T = True
 * 3. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePacket = exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "HDT";
exports.sentenceName = "Heading - true";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        heading: helpers_1.parseFloatSafe(fields[1])
    };
}
exports.decodeSentence = decodeSentence;
function encodePacket(packet, talker) {
    var result = ["$" + talker + exports.sentenceId];
    result.push(helpers_1.encodeFixed(packet.heading, 1));
    result.push("T");
    var resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + helpers_1.createNmeaChecksumFooter(resultWithoutChecksum);
}
exports.encodePacket = encodePacket;
