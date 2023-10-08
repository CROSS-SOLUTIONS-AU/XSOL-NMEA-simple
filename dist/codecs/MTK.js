"use strict";
/*
 * === MTK - Configuration packet ===
 *
 * ------------------------------------------------------------------------------
 *       1   2 ... n n+1
 *       |   |     | |
 * $--MTKxxx,a,...,a*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Packet type (000-999)
 * 2. - n. Data fields; meaning and quantity vary depending on the packet type
 * n+1. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePacket = exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "MTK";
exports.sentenceName = "Configuration packet";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        packetType: helpers_1.parseIntSafe(fields[0].substr(3)),
        data: fields.slice(1).map(helpers_1.parseNumberOrString)
    };
}
exports.decodeSentence = decodeSentence;
function encodePacket(packet, talker) {
    var result = ["$" + talker + exports.sentenceId + helpers_1.padLeft(packet.packetType, 3, "0")];
    result = result.concat(packet.data.toString());
    var resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + helpers_1.createNmeaChecksumFooter(resultWithoutChecksum);
}
exports.encodePacket = encodePacket;
