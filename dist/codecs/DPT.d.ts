export declare const sentenceId: "DPT";
export declare const sentenceName = "Depth";
export interface DPTPacket {
    sentenceId: "DPT";
    sentenceName?: string;
    depthMeters: number;
    maximumMeters: number;
    offsetMeters: number;
    talkerId?: string;
}
export declare function decodeSentence(fields: string[]): DPTPacket;
export declare function encodePacket(packet: DPTPacket, talker: string): string;
