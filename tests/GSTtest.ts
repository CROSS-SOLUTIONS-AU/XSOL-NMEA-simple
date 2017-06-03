import "should";

import { parseNmeaSentence } from "../index";


describe("GST", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$GPGST,172814.0,0.006,0.023,0.020,273.6,0.023,0.020,0.031*6A");

    packet.should.have.property("sentenceId", "GST");
    packet.should.have.property("sentenceName", "GPS pseudorange noise statistics");
    packet.should.have.property("talkerId", "GP");
    packet.should.have.property("time", new Date(Date.UTC(0, 0, 0, 17, 28, 14)));
    packet.should.have.property("totalRms", 0.006);
    packet.should.have.property("semiMajorError", 0.023);
    packet.should.have.property("semiMinorError", 0.020);
    packet.should.have.property("orientationOfSemiMajorError", 273.6);
    packet.should.have.property("latitudeError", 0.023);
    packet.should.have.property("longitudeError", 0.020);
    packet.should.have.property("altitudeError", 0.031);
  });

});
