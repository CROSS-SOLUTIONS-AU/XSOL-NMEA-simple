"use strict";
/*
 * === MWV - Wind speed and angle ===
 *
 * ------------------------------------------------------------------------------
 *        1   2 3   4 5
 *        |   | |   | |
 * $--MWV,x.x,a,x.x,a*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 *
 * 1. Wind Angle, 0 to 360 degrees
 * 2. Reference, R = Relative, T = True
 * 3. Wind Speed
 * 4. Wind Speed Units, K/M/N
 * 5. Status, A = Data Valid
 * 6. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePacket = exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "MWV";
exports.sentenceName = "Wind speed and angle";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        windAngle: helpers_1.parseFloatSafe(fields[1]),
        reference: fields[2] === "R" ? "relative" : "true",
        speed: helpers_1.parseFloatSafe(fields[3]),
        units: fields[4] === "K" ? "K" : fields[4] === "M" ? "M" : "N",
        status: fields[5] === "A" ? "valid" : "invalid"
    };
}
exports.decodeSentence = decodeSentence;
function encodePacket(packet, talker) {
    var result = ["$" + talker + exports.sentenceId];
    result.push(helpers_1.encodeDegrees(packet.windAngle));
    result.push(packet.reference === "relative" ? "R" : "T");
    result.push(helpers_1.encodeFixed(packet.speed, 2));
    result.push(packet.units === "K" ? "K" : packet.units === "M" ? "M" : "N");
    result.push(packet.status === "valid" ? "A" : "V");
    var resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + helpers_1.createNmeaChecksumFooter(resultWithoutChecksum);
}
exports.encodePacket = encodePacket;
