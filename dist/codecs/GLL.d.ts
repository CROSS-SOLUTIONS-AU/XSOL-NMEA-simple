export declare const sentenceId: "GLL";
export declare const sentenceName = "Geographic position - latitude and longitude";
export interface GLLPacket {
    sentenceId: "GLL";
    sentenceName?: string;
    talkerId?: string;
    latitude: number;
    longitude: number;
    time: Date;
    status: "valid" | "invalid";
    faaMode?: string;
}
export declare function decodeSentence(fields: string[]): GLLPacket;
export declare function encodePacket(packet: GLLPacket, talker: string): string;
