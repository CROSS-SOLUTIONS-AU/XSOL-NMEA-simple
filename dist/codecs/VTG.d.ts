export declare const sentenceId: "VTG";
export declare const sentenceName = "Track made good and ground speed";
export interface VTGPacket {
    sentenceId: "VTG";
    sentenceName?: string;
    talkerId?: string;
    trackTrue: number;
    trackMagnetic: number;
    speedKnots: number;
    speedKmph?: number;
    faaMode?: string;
}
export declare function decodeSentence(fields: string[]): VTGPacket;
export declare function encodePacket(packet: VTGPacket, talker: string): string;
