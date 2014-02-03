var Packet = require('./packet').Packet;

// Expects payload to be a buffer
function split(payload) {
  var splits = [];
  var i = 0;
  var length = payload[i++];

  while (i < length) {
    // Grab the length of the entire packet
    var packetLength = payload[i++];
    // Grab the kind of packet
    var type = payload[i++];
    // The length of the data is the whole thing minus the type byte
    var dataLen = packetLength-1;
    // Create a new buffer for the data
    var data = new Buffer(dataLen);
    // Copy over fromt the whole payload
    payload.copy(data, 0, i, i + dataLen);
    // Add it to our array
    splits.push({type: type, data : data});
    // Increment our indexer
    i+=dataLen;
  }

  return splits;
}

function parse(buffer, byteOrder, callback) {
  byteOrder = byteOrder ? byteOrder : "BE";

  if (byteOrder != "BE" && byteOrder != "LE") {
    callback && callback(new Error("Invalid Byte Order. Must be 'BE' or 'LE'"));
    return;
  }

  if (!Buffer.isBuffer(buffer)) {
    callback && callback(new Error("Data must be a buffer"));
    return;
  }

  var splits = split(buffer);

  var packets = [];

  splits.forEach(function(split) {
    packets.push(new Packet(split.type, split.data));
  });

  return packets;
}

function parseLE(buffer) {
  parse(buffer, "LE");
}

function parseBE(buffer) {
  parse(buffer, "BE");
}

module.exports.split = split;
module.exports.parse = parse;
