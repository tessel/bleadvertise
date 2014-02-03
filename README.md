# ble-ad-parser

## Description
This package will parse BLE slave advertisement packets into human readable/manipulatable objects. Based off of the BLE specification [data types](https://www.bluetooth.org/en-us/specification/assigned-numbers/generic-access-profile).
## Install
```
npm install ble-ad-parser
```

## Usage

```
var parser = require('ble-ad-parser');

// Payload from your BLE device (make it into a buffer, if not already)

var payload = new Buffer([27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 56, 88, 171, 173, 5, 22, 10, 24, 7, 4]);

// Parse (little-endian by default)
var packets = parser.parse(payload);

// 

console.log(packets.length); // 3
console.log(packets[0].type); // Flags
console.log(packets[0].data); //  [ 'LE Limited Discoverable Mode' ]

console.log(packets[1].type); // 'Incomplete List of 128-bit Service Class UUIDs'
console.log(packets[1].data); // [ '0xba5689a6fabfa2bd01467d6e3858abad' ] 
```

## Packet Structure
The returned packets in the packet array have the following structure:

*packet*.type -> A string describing type of data (eg. "Flags", "Complete List of 16-bit UUIDs", etc.)

*packet*.data -> The data parsed into appropriate data type (eg. String, Array of Octet Strings, unsigned int, etc.)

*packet*.typeFlag -> the type flag parsed from packet

*packet*.raw -> The raw buffer that was parsed

## Endianness

You can specify the endianess that you want the buffers parsed with by using these functions:
```
parser.parseLE(buffer);
parse.parseBE(buffer);
```

## License
MIT







