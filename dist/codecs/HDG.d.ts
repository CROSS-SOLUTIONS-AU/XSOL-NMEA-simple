export declare const sentenceId: "HDG";
export declare const sentenceName = "Heading - deviation and variation";
export interface HDGPacket {
    sentenceId: "HDG";
    sentenceName?: string;
    talkerId?: string;
    heading: number;
    deviation: number;
    deviationDirection: "" | "E" | "W";
    variation: number;
    variationDirection: "" | "E" | "W";
}
export declare function decodeSentence(fields: string[]): HDGPacket;
