export declare const sentenceId: "VHW";
export declare const sentenceName = "Water speed and heading";
export interface VHWPacket {
    sentenceId: "VHW";
    sentenceName?: string;
    talkerId?: string;
    degreesTrue: number;
    degreesMagnetic: number;
    speedKnots: number;
    speedKmph: number;
}
export declare function decodeSentence(fields: string[]): VHWPacket;
