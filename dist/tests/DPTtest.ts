import "should";

import { encodeNmeaPacket, parseNmeaSentence } from "../index";


describe("DPT", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$SDDPT,8.34,0.000,17.14*69");

    packet.should.have.property("sentenceId", "DPT");
    packet.should.have.property("sentenceName", "Depth");
    packet.should.have.property("depthMeters", 8.34);
    packet.should.have.property("offsetMeters", 0);
    packet.should.have.property("maximumMeters", 17.14);
  });

  /*it("encoder", (): void => {
    const sentence = encodeNmeaPacket({
      sentenceId: "DBT",
      depthFeet: 36.41,
      depthFathoms: 5.99,
      depthMeters: 11.10
    }, "II");

    sentence.should.equal("$IIDBT,36.41,f,11.10,M,5.99,F*25");
  });*/

});
