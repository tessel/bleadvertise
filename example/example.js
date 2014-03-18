var parser = require('../');

var payload = new Buffer([21, 2, 1, 6, 17, 7, 102, 154, 12, 32, 0, 8, 31, 152, 227, 17, 197, 108, 160, 199, 200, 8]);

// Parse (little-endian by default)
var packets = parser.parse(payload);

// 

console.log(packets.length); // 3
console.log(packets[0].type); // Flags
console.log(packets[0].data); //  [ 'LE General Discoverable Mode', 'BR/EDR Not Supported' ]

console.log(packets[1].type); // 'Incomplete List of 128-bit Service Class UUIDs'
console.log(packets[1].data); // [ '0xadab58386e7d4601bda2bffaa68956ba' ]