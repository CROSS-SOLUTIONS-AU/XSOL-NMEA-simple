export declare const sentenceId: "HDT";
export declare const sentenceName = "Heading - true";
export interface HDTPacket {
    sentenceId: "HDT";
    sentenceName?: string;
    talkerId?: string;
    heading: number;
}
export declare function decodeSentence(fields: string[]): HDTPacket;
export declare function encodePacket(packet: HDTPacket, talker: string): string;
