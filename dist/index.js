"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeNmeaPacket = exports.parseNmeaSentence = void 0;
var APB_1 = require("./codecs/APB");
var BWC_1 = require("./codecs/BWC");
var DBT_1 = require("./codecs/DBT");
var DPT_1 = require("./codecs/DPT");
var DTM_1 = require("./codecs/DTM");
var GGA_1 = require("./codecs/GGA");
var GLL_1 = require("./codecs/GLL");
var GNS_1 = require("./codecs/GNS");
var GSA_1 = require("./codecs/GSA");
var GST_1 = require("./codecs/GST");
var GSV_1 = require("./codecs/GSV");
var HDG_1 = require("./codecs/HDG");
var HDM_1 = require("./codecs/HDM");
var HDT_1 = require("./codecs/HDT");
var MTK_1 = require("./codecs/MTK");
var MWV_1 = require("./codecs/MWV");
var RDID_1 = require("./codecs/RDID");
var RMC_1 = require("./codecs/RMC");
var VHW_1 = require("./codecs/VHW");
var VTG_1 = require("./codecs/VTG");
var ZDA_1 = require("./codecs/ZDA");
var helpers_1 = require("./helpers");
var decoders = {
    APB: APB_1.decodeSentence,
    BWC: BWC_1.decodeSentence,
    DBT: DBT_1.decodeSentence,
    DPT: DPT_1.decodeSentence,
    DTM: DTM_1.decodeSentence,
    GGA: GGA_1.decodeSentence,
    GLL: GLL_1.decodeSentence,
    GNS: GNS_1.decodeSentence,
    GSA: GSA_1.decodeSentence,
    GST: GST_1.decodeSentence,
    GSV: GSV_1.decodeSentence,
    HDG: HDG_1.decodeSentence,
    HDM: HDM_1.decodeSentence,
    HDT: HDT_1.decodeSentence,
    MTK: MTK_1.decodeSentence,
    MWV: MWV_1.decodeSentence,
    RDID: RDID_1.decodeSentence,
    RMC: RMC_1.decodeSentence,
    VHW: VHW_1.decodeSentence,
    VTG: VTG_1.decodeSentence,
    ZDA: ZDA_1.decodeSentence
};
var encoders = {
    DBT: DBT_1.encodePacket,
    GGA: GGA_1.encodePacket,
    GLL: GLL_1.encodePacket,
    GNS: GNS_1.encodePacket,
    HDM: HDM_1.encodePacket,
    HDT: HDT_1.encodePacket,
    MTK: MTK_1.encodePacket,
    MWV: MWV_1.encodePacket,
    VTG: VTG_1.encodePacket
};
function parseNmeaSentence(sentence) {
    if (!helpers_1.validNmeaChecksum(sentence)) {
        throw Error("Invalid sentence: \"" + sentence + "\".");
    }
    var fields = sentence.split("*")[0].split(",");
    var talkerId;
    var sentenceId;
    if (fields[0].charAt(1) === "P") {
        talkerId = "P"; // Proprietary
        sentenceId = fields[0].substr(2);
    }
    else {
        talkerId = fields[0].substr(1, 2);
        sentenceId = fields[0].substr(3);
    }
    fields[0] = sentenceId;
    var parser = decoders[sentenceId];
    if (!parser && sentenceId.substr(0, 3) === "MTK") {
        parser = MTK_1.decodeSentence;
    }
    if (!parser) {
        throw Error("No known parser for sentence ID \"" + sentenceId + "\".");
    }
    var packet = parser(fields);
    packet.talkerId = talkerId;
    return packet;
}
exports.parseNmeaSentence = parseNmeaSentence;
function encodeNmeaPacket(packet, talker) {
    if (talker === void 0) { talker = "P"; }
    if (packet === undefined) {
        throw new Error("Packet must be given.");
    }
    var encoder = encoders[packet.sentenceId];
    if (encoder) {
        return encoder(packet, talker);
    }
    else {
        throw Error("No known encoder for sentence ID \"" + packet.sentenceId + "\"");
    }
}
exports.encodeNmeaPacket = encodeNmeaPacket;
