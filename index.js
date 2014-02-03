var PacketParser = require('./lib/parser');

module.exports.parse = PacketParser.parse;
module.exports.parseLE = PacketParser.parseLE;
module.exports.parseBE = PacketParser.parseBE;

// For testing only
module.exports.split = PacketParser.split;