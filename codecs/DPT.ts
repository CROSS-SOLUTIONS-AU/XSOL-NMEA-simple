/*
 * === DPT - Depth ===
 $xxDPT,DATA_METRES,OFFSET_METRES,
    MAXIMUM_METRES*hh<0D><0A>
 */

import { createNmeaChecksumFooter, encodeFixed, parseFloatSafe } from "../helpers";


export const sentenceId: "DPT" = "DPT";
export const sentenceName = "Depth";


export interface DPTPacket {
    sentenceId: "DPT";
    sentenceName?: string;
    depthMeters: number;
    maximumMeters: number;
    offsetMeters: number;
    talkerId?: string;
}


export function decodeSentence(fields: string[]): DPTPacket {
    return {
        sentenceId: sentenceId,
        sentenceName: sentenceName,
        depthMeters: parseFloatSafe(fields[1]),
        offsetMeters: parseFloatSafe(fields[2]),
        maximumMeters: parseFloatSafe(fields[3])
    };
}


export function encodePacket(packet: DPTPacket, talker: string): string {
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
