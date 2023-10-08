export declare const sentenceId: "RDID";
export declare const sentenceName = "RDI proprietary heading, pitch, and roll";
export interface RDIDPacket {
    sentenceId: "RDID";
    sentenceName?: string;
    talkerId?: string;
    roll: number;
    pitch: number;
    heading: number;
}
export declare function decodeSentence(fields: string[]): RDIDPacket;
