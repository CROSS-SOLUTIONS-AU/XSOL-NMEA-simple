export declare const sentenceId: "BWC";
export declare const sentenceName = "Bearing and distance to waypoint - great circle";
export interface BWCPacket {
    sentenceId: "BWC";
    sentenceName?: string;
    talkerId?: string;
    time: Date;
    bearingLatitude: number;
    bearingLongitude: number;
    bearingTrue: number;
    bearingMagnetic: number;
    distanceNm: number;
    waypointId: string;
    faaMode?: string;
}
export declare function decodeSentence(fields: string[]): BWCPacket;
