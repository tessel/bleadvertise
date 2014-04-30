// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

var expect = require('chai').expect;
var packet = require('../lib/packet');
var Packet = packet.Packet;
var toOctetStringArray = packet.toOctetStringArray;

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

    it("should parse buffers into the correct kind of string", function() {
      expect(toOctetStringArray(2, new Buffer([15, 89, 254, 14, 37, 89]), null, "BE")).to.have.a.property("length").to.equal(3);
      expect(toOctetStringArray(4, new Buffer([15, 89, 254, 14]), null, "LE")).to.have.a.property("length").to.equal(1);
      expect(toOctetStringArray(8, new Buffer([15, 89, 254, 14, 145, 65, 24, 98]), null, "LE")).to.have.a.property("length").to.equal(1);
      expect(toOctetStringArray(16, new Buffer([15, 89, 254, 14, 145, 65, 24, 98, 15, 89, 254, 14, 145, 65, 24, 98, 15, 89, 254, 14, 145, 65, 24, 98, 15, 89, 254, 14, 145, 65, 24, 98]), null, "LE")).to.have.a.property("length").to.equal(2);
    });

    it("should make sure packet data is being resolved to the correct type", function() {
      expect(Array.isArray(new Packet(types[0]).data)).to.equal(true);
      expect(Array.isArray(new Packet(types[1]).data)).to.equal(true);
      expect(Array.isArray(new Packet(types[2]).data)).to.equal(false);
      expect(typeof (new Packet(types[2]).data)).to.equal("number");
    })
  });
});
