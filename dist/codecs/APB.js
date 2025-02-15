"use strict";
/*
 * === APB - Autopilot Sentence "B" ===
 *
 * ------------------------------------------------------------------------------
 *                                         13    15
 *        1 2 3   4 5 6 7 8   9 10   11  12|   14|
 *        | | |   | | | | |   | |    |   | |   | |
 * $--APB,A,A,x.x,a,N,A,A,x.x,a,c--c,x.x,a,x.x,a*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Status
 *    V = LORAN-C Blink or SNR warning
 *    V = general warning flag or other navigation systems when a reliable
 *        fix is not available
 * 2. Status
 *    V = Loran-C Cycle Lock warning flag
 *    A = OK or not used
 * 3. Cross Track Error Magnitude
 * 4. Direction to steer, L or R
 * 5. Cross Track Units, N = Nautical Miles
 * 6. Status
 *    A = Arrival Circle Entered
 * 7. Status
 *    A = Perpendicular passed at waypoint
 * 8. Bearing origin to destination
 * 9. M = Magnetic, T = True
 * 10. Destination Waypoint ID
 * 11. Bearing, present position to Destination
 * 12. M = Magnetic, T = True
 * 13. Heading to steer to destination waypoint
 * 14. M = Magnetic, T = True
 * 15. Checksum
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSentence = exports.sentenceName = exports.sentenceId = void 0;
var helpers_1 = require("../helpers");
exports.sentenceId = "APB";
exports.sentenceName = "Autopilot sentence \"B\"";
function decodeSentence(fields) {
    return {
        sentenceId: exports.sentenceId,
        sentenceName: exports.sentenceName,
        status1: fields[1],
        status2: fields[2],
        xteMagn: helpers_1.parseFloatSafe(fields[3]),
        steerDir: fields[4],
        xteUnit: fields[5],
        arrivalCircleStatus: fields[6],
        arrivalPerpendicularStatus: fields[7],
        bearingOrig2Dest: helpers_1.parseFloatSafe(fields[8]),
        bearingOrig2DestType: fields[9],
        waypoint: fields[10],
        bearing2Dest: helpers_1.parseFloatSafe(fields[11]),
        bearingDestType: fields[12],
        heading2steer: helpers_1.parseFloatSafe(fields[13]),
        headingDestType: fields[14]
    };
}
exports.decodeSentence = decodeSentence;
