export declare const sentenceId: "GSA";
export declare const sentenceName = "Active satellites and dilution of precision";
export declare type ThreeDFixType = "unknown" | "none" | "2D" | "3D";
export interface GSAPacket {
    sentenceId: "GSA";
    sentenceName?: string;
    talkerId?: string;
    selectionMode: "automatic" | "manual";
    fixMode: ThreeDFixType;
    satellites: number[];
    PDOP: number;
    HDOP: number;
    VDOP: number;
}
export declare function decodeSentence(fields: string[]): GSAPacket;
