export declare const sentenceId: "APB";
export declare const sentenceName = "Autopilot sentence \"B\"";
export interface APBPacket {
    sentenceId: "APB";
    sentenceName?: string;
    talkerId?: string;
    status1: string;
    status2: string;
    xteMagn: number;
    steerDir: string;
    xteUnit: string;
    arrivalCircleStatus: string;
    arrivalPerpendicularStatus: string;
    bearingOrig2Dest: number;
    bearingOrig2DestType: string;
    waypoint: string;
    bearing2Dest: number;
    bearingDestType: string;
    heading2steer: number;
    headingDestType: string;
}
export declare function decodeSentence(fields: string[]): APBPacket;
