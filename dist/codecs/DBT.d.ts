export declare const sentenceId: "DBT";
export declare const sentenceName = "Depth below transducer";
export interface DBTPacket {
    sentenceId: "DBT";
    sentenceName?: string;
    talkerId?: string;
    depthFeet: number;
    depthMeters: number;
    depthFathoms: number;
}
export declare function decodeSentence(fields: string[]): DBTPacket;
export declare function encodePacket(packet: DBTPacket, talker: string): string;
