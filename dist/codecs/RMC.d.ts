export declare const sentenceId: "RMC";
export declare const sentenceName = "Recommended minimum navigation information";
export interface RMCPacket {
    sentenceId: "RMC";
    sentenceName?: string;
    talkerId?: string;
    datetime: Date;
    status: "valid" | "warning";
    latitude: number;
    longitude: number;
    speedKnots: number;
    trackTrue: number;
    variation: number;
    variationPole: "" | "E" | "W";
    faaMode?: string;
}
export declare function decodeSentence(fields: string[]): RMCPacket;
