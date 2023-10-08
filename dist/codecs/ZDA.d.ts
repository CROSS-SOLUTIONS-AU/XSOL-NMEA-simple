export declare const sentenceId: "ZDA";
export declare const sentenceName = "UTC, day, month, year, and local time zone";
export interface ZDAPacket {
    sentenceId: "ZDA";
    sentenceName: string;
    talkerId?: string;
    datetime: Date;
    localZoneHours: number;
    localZoneMinutes: number;
}
export declare function decodeSentence(fields: string[]): ZDAPacket;
