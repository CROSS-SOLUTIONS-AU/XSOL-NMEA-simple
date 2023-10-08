export declare const sentenceId: "MWV";
export declare const sentenceName = "Wind speed and angle";
export interface MWVPacket {
    sentenceId: "MWV";
    sentenceName?: string;
    talkerId?: string;
    windAngle: number;
    reference: "relative" | "true";
    speed: number;
    units: "K" | "M" | "N";
    status: "valid" | "invalid";
}
export declare function decodeSentence(fields: string[]): MWVPacket;
export declare function encodePacket(packet: MWVPacket, talker: string): string;
