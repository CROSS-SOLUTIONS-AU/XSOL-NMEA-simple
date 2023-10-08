"use strict";
/*
 * === GSV - Satellites in view ===
 *
 * ------------------------------------------------------------------------------
 *         1 2 3  4  5  6  7   8  9  10 11  12 13 14 15  16 17 18 19  20 21
 *         | | |  |  |  |  |   |  |  |  |   |  |  |  |   |  |  |  |   |  |
 *  $--GSA,x,x,xx,xx,xx,xx,xxx,xx,xx,xx,xxx,xx,xx,xx,xxx,xx,xx,xx,xxx,xx*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 *
 * 1. Number of sentences for full data
 * 2. Sentence number out of total
 * 3. Number of satellites in view
 * 4. PRN of satellite used for fix (may be blank)
 *
 * 5. Satellite PRN number     \
 * 6. Elevation, degrees       +- Satellite 1
 * 7. Azimuth, degrees         |
 * 8. Signal to noise ratio    /
 *
 * 9. Satellite PRN number     \
 * 10. Elevation, degrees      +- Satellite 2
 * 11. Azimuth, degrees        |
 * 12. Signal to noise ratio   /
 *
 * 13. Satellite PRN number    \
 * 14. Elevation, degrees      +- Satellite 3
 * 15. Azimuth, degrees        |
 * 16. Signal to noise ratio   /
 *
 * 17. Satellite PRN number    \
 * 18. Elevation, degrees      +- Satellite 4
 * 19. Azimuth, degrees        |
 * 20. Signal to noise ratio   /
 *
 * 21. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "GSV";
exports.sentenceName = "Satellites in view";
function decodeSentence(fields) {
    var numRecords = (fields.length - 4) / 4;
    var sats = [];
    for (var i = 0; i < numRecords; i++) {
        var offset = i * 4 + 4;
        sats.push({
            prnNumber: helpers_1.parseIntSafe(fields[offset]),
            elevationDegrees: helpers_1.parseIntSafe(fields[offset + 1]),
            azimuthTrue: helpers_1.parseIntSafe(fields[offset + 2]),
            SNRdB: helpers_1.parseIntSafe(fields[offset + 3])
        });
    }
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        numberOfMessages: helpers_1.parseIntSafe(fields[1]),
        messageNumber: helpers_1.parseIntSafe(fields[2]),
        satellitesInView: helpers_1.parseIntSafe(fields[3]),
        satellites: sats
    };
}
exports.decodeSentence = decodeSentence;
