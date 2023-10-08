export declare const sentenceId: "HDM";
export declare const sentenceName = "Heading - magnetic";
export interface HDMPacket {
    sentenceId: "HDM";
    sentenceName?: string;
    talkerId?: string;
    heading: number;
}
export declare function decodeSentence(fields: string[]): HDMPacket;
export declare function encodePacket(packet: HDMPacket, talker: string): string;
