var expect = require('chai').expect;
var Packet = require('../lib/packet');

describe("Packet", function() {
  describe("#new Packet()", function() {

    var types = [0x1, 0x5, 0xa, 0x1f, 0x21, 0x3d];

    it("should create a new packet with the correct data type", function() {
      expect(new Packet(types[0]).type).to.equal("Flags");
      expect(new Packet(types[1]).type).to.equal("Complete List of 32-bit Service Class UUIDs");
      expect(new Packet(types[2]).type).to.equal("Tx Power Level");
      expect(new Packet(types[3]).type).to.equal("List of 32-bit Service Solicitation UUIDs");
      expect(new Packet(types[4]).type).to.equal("Service Data - 128-bit UUID");
      expect(new Packet(types[5]).type).to.equal("3D Information Data");
    });

    it ("should make sure packet data is being resolved to the correct type", function() {
      expect(typeof new Packet(types[0]).data).to.equal('string')
    })
  });
});