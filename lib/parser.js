var Packet = require('./packet');
// Iterate through entire payload  
// Seperate into packets
// Turn into JSON

// Expects payload to be a buffer
function split(payload) {
  var i = 0;
  var length = payload[i++];

  while (length) {
    var packetLength = payload[i++];

  }
}



module.exports.split = split;