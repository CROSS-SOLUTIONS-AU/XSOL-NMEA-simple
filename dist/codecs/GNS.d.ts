export declare const sentenceId: "GNS";
export declare const sentenceName = "GNSS fix data";
export interface GNSPacket {
    sentenceId: "GNS";
    sentenceName?: string;
    talkerId?: string;
    time: Date;
    latitude: number;
    longitude: number;
    modeIndicator: string;
    satellitesInView: number;
    horizontalDilution: number;
    altitudeMeters: number;
    geoidalSeperation: number;
    differentialAge?: number;
    differentialRefStn?: string;
}
export declare function decodeSentence(fields: string[]): GNSPacket;
export declare function encodePacket(packet: GNSPacket, talker: string): string;
