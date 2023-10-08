"use strict";
/*
 * === VTG - Track made good and ground speed ===
 *
 * ------------------------------------------------------------------------------
 *        1     2 3     4 5   6 7   8 9  10
 *        |     | |     | |   | |   | |  |
 * $--VTG,xxx.x,T,xxx.x,M,x.x,N,x.x,K,m,*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 *
 * 1. Track Degrees
 * 2. T = True
 * 3. Track Degrees
 * 4. M = Magnetic
 * 5. Speed Knots
 * 6. N = Knots
 * 7. Speed Kilometers Per Hour
 * 8. K = Kilometers Per Hour
 * 9. FAA mode indicator (NMEA 2.3 and later)
 * 10. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePacket = exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "VTG";
exports.sentenceName = "Track made good and ground speed";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        trackTrue: helpers_1.parseFloatSafe(fields[1]),
        trackMagnetic: helpers_1.parseFloatSafe(fields[3]),
        speedKnots: helpers_1.parseFloatSafe(fields[5]),
        speedKmph: helpers_1.parseFloatSafe(fields[7]),
        faaMode: fields[9]
    };
}
exports.decodeSentence = decodeSentence;
function encodePacket(packet, talker) {
    var result = ["$" + talker + exports.sentenceId];
    result.push(helpers_1.encodeDegrees(packet.trackTrue));
    result.push("T");
    result.push(helpers_1.encodeDegrees(packet.trackMagnetic));
    result.push("M");
    result.push(helpers_1.encodeFixed(packet.speedKnots, 2));
    result.push("N");
    if (packet.speedKmph) {
        result.push(helpers_1.encodeFixed(packet.speedKmph, 2));
        result.push("K");
    }
    else {
        result.push("");
        result.push("");
    }
    if (packet.faaMode) {
        result.push(packet.faaMode);
    }
    var resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + helpers_1.createNmeaChecksumFooter(resultWithoutChecksum);
}
exports.encodePacket = encodePacket;
