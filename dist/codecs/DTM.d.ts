export declare const sentenceId: "DTM";
export declare const sentenceName = "Datum reference";
/**
 * Local datum code (xxx):
 * W84 = WGS84
 * W72 = WGS72
 * S85 = SGS85
 * P90 = PE90
 * 999 = User defined IHO datum code
 */
export declare type DatumCode = "W84" | "W72" | "S85" | "P90" | "999" | "";
export interface DTMPacket {
    sentenceId: "DTM";
    sentenceName?: string;
    talkerId?: string;
    datumCode: DatumCode;
    datumSubcode?: string;
    offsetLatitude: number;
    offsetLongitude: number;
    offsetAltitudeMeters: number;
    datumName: DatumCode;
}
export declare function decodeSentence(fields: string[]): DTMPacket;
