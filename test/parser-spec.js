var expect = require('chai').expect;
var parser = require('../lib/parser');

describe("Parser", function() {

  describe("#split()", function() {
    it("should split up an advertisement packet into distinct data formats", function() {
      var payload = [27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 56, 88, 171, 173, 5, 22, 10, 24, 7, 4];

      expect(parser.split(new Buffer(payload)).length).to.equal(3);
        var packets = parser.split(new Buffer(payload));
        var parsed = parser.parse(new Buffer(payload));
        console.log(parsed);
    })
    it("should properly parse a payload into the correct kinds of data", function() {

    });
  })
});