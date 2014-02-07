var parser = require('../');

var payload = new Buffer([27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 56, 88, 171, 173, 5, 22, 10, 24, 7, 4]);

// Parse (little-endian by default)
var packets = parser.parse(payload);

// 

console.log(packets.length); // 3
console.log(packets[0].type); // Flags
console.log(packets[0].data); //  [ 'LE General Discoverable Mode', 'BR/EDR Not Supported' ]

console.log(packets[1].type); // 'Incomplete List of 128-bit Service Class UUIDs'
console.log(packets[1].data); // [ '0xadab58386e7d4601bda2bffaa68956ba' ]