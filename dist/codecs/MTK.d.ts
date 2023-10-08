export declare const sentenceId: "MTK";
export declare const sentenceName = "Configuration packet";
export interface MTKPacket {
    sentenceId: "MTK";
    sentenceName?: string;
    talkerId?: string;
    packetType: number;
    data: (string | number)[];
}
export declare function decodeSentence(fields: string[]): MTKPacket;
export declare function encodePacket(packet: MTKPacket, talker: string): string;
