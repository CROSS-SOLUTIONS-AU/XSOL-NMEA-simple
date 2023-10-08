"use strict";
/*
 * === DPT - Depth ===
 $xxDPT,DATA_METRES,OFFSET_METRES,
    MAXIMUM_METRES*hh<0D><0A>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePacket = exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "DPT";
exports.sentenceName = "Depth";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        depthMeters: helpers_1.parseFloatSafe(fields[1]),
        offsetMeters: helpers_1.parseFloatSafe(fields[2]),
        maximumMeters: helpers_1.parseFloatSafe(fields[3])
    };
}
exports.decodeSentence = decodeSentence;
function encodePacket(packet, talker) {
    /*const result = ["$" + talker + sentenceId];

    result.push(encodeFixed(packet.depthFeet, 2));
    result.push("f");
    result.push(encodeFixed(packet.depthMeters, 2));
    result.push("M");
    result.push(encodeFixed(packet.depthFathoms, 2));
    result.push("F");

    const resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + createNmeaChecksumFooter(resultWithoutChecksum);*/
    throw new Error("Not implemented yet");
}
exports.encodePacket = encodePacket;
