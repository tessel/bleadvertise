// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

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

  // If a byte order wasn't passed it, make it big endian by default
  byteOrder = byteOrder ? byteOrder : "BE";

  // Confirm that it's one of the two options
  if (byteOrder != "BE" && byteOrder != "LE") {
    callback && callback(new Error("Invalid Byte Order. Must be 'BE' or 'LE'"));
    return;
  }

  // If the data isn't in a buffer, get mad
  if (!Buffer.isBuffer(buffer)) {
    callback && callback(new Error("Data must be a buffer"));
    return;
  }

  // Split up the payload into packet chunks
  var splits = split(buffer);

  var packets = [];

  // For each chunks, make a payload object and put in return array
  splits.forEach(function(split) {
    packets.push(new Packet(split.type, split.data, byteOrder));
  });

  // Call callback, if any
  callback && callback(null, packets);

  return packets;
}

function parseLE(buffer) {
  return parse(buffer, "LE");
}

function parseBE(buffer) {
  return parse(buffer, "BE");
}

module.exports.split = split;
module.exports.parse = parse;
module.exports.parseLE = parseLE;
module.exports.parseBE = parseBE;
