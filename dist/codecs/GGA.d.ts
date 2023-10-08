export declare const sentenceId: "GGA";
export declare const sentenceName = "Global positioning system fix data";
export declare type FixType = "none" | "fix" | "delta" | "pps" | "rtk" | "frtk" | "estimated" | "manual" | "simulation";
export interface GGAPacket {
    sentenceId: "GGA";
    sentenceName?: string;
    talkerId?: string;
    time: Date;
    latitude: number;
    longitude: number;
    fixType: FixType;
    satellitesInView: number;
    horizontalDilution: number;
    altitudeMeters: number;
    geoidalSeperation: number;
    differentialAge?: number;
    differentialRefStn?: string;
}
export declare function decodeSentence(fields: string[]): GGAPacket;
export declare function encodePacket(packet: GGAPacket, talker: string): string;
