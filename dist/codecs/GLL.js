"use strict";
/*
 * === GLL - Geographic position - latitude and longitude ===
 *
 * ------------------------------------------------------------------------------
 *         1       2 3        4 5         6 7  8
 *         |       | |        | |         | |  |
 *  $--GLL,llll.ll,a,yyyyy.yy,a,hhmmss.ss,a,m,*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 *
 * 1. Latitude
 * 2. N or S (North or South)
 * 3. Longitude
 * 4. E or W (East or West)
 * 5. Universal Time Coordinated (UTC)
 * 6. Status
 *    A - Data Valid
 *    V - Data Invalid
 * 7. FAA mode indicator (NMEA 2.3 and later)
 * 8. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePacket = exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "GLL";
exports.sentenceName = "Geographic position - latitude and longitude";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        latitude: helpers_1.parseLatitude(fields[1], fields[2]),
        longitude: helpers_1.parseLongitude(fields[3], fields[4]),
        time: helpers_1.parseTime(fields[5]),
        status: fields[6] === "A" ? "valid" : "invalid",
        faaMode: fields[7]
    };
}
exports.decodeSentence = decodeSentence;
function encodePacket(packet, talker) {
    var result = ["$" + talker + exports.sentenceId];
    result.push(helpers_1.encodeLatitude(packet.latitude));
    result.push(helpers_1.encodeLongitude(packet.longitude));
    result.push(helpers_1.encodeTime(packet.time));
    result.push(packet.status === "valid" ? "A" : "V");
    if (packet.faaMode) {
        result.push(packet.faaMode);
    }
    var resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + helpers_1.createNmeaChecksumFooter(resultWithoutChecksum);
}
exports.encodePacket = encodePacket;
