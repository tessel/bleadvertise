# bleadvertise

## Description
This package can parse BLE slave advertisement packets into human readable/manipulatable objects and build advertisement packets from JSON objects. Based off of the BLE specification [data types](https://www.bluetooth.org/en-us/specification/assigned-numbers/generic-access-profile).
## Install
```
npm install bleadvertise
```

## Usage

### Packet Parsing

```.js
var parser = require('bleadvertise');

// Payload from your BLE device (make it into a buffer, if not already)

var payload = new Buffer([27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 56, 88, 171, 173, 5, 22, 10, 24, 7, 4]);

// Parse (little-endian by default)
var packets = parser.parse(payload);

console.log(packets.length); // 3
console.log(packets[0].type); // Flags
console.log(packets[0].data); //  [ 'LE Limited Discoverable Mode' ]

console.log(packets[1].type); // 'Incomplete List of 128-bit Service Class UUIDs'
console.log(packets[1].data); // [ '0xba5689a6fabfa2bd01467d6e3858abad' ]
```

### Packet Structure
The returned packets in the packet array have the following structure:

*packet*.type -> A string describing type of data (eg. "Flags", "Complete List of 16-bit UUIDs", etc.)

*packet*.data -> The data parsed into appropriate data type (eg. String, Array of Octet Strings, unsigned int, etc.)

*packet*.typeFlag -> the type flag parsed from packet

*packet*.raw -> The raw buffer that was parsed

### Endianness

You can specify the endianess that you want the buffers parsed with by using these functions:
```.js
parser.parseLE(buffer);
parse.parseBE(buffer);
```

### Building Packets
```.js
var parser = require('bleadverise');

// Create your advertisement packet
var packet = {
	flags : [0x02, 0x04],
	incompleteUUID16 : ['2A00','2A01'],
	completeName : 'My Device'
};

// Serialize it into a Buffer
var payload = parser.serialize(packet);

console.log(payload);
// <Buffer 02 01 06 05 02 00 2a 01 2a 0a 09 4d 79 20 44 65 76 69 63 65>
```

You can create an advertisement packet buffer from an object with the following keys and their corresponding data types:

*flags* - An array of integers

*incompleteUUID16* - An array of 16 bit UUID hex strings

*completeUUID16* - An array of 16 bit UUID hex strings

*incompleteUUID32* - An array of 32 bit UUID hex strings

*completeUUID32* - An array of 32 bit UUID hex strings

*incompleteUUID128* - An array of 128 bit UUID hex strings

*completeUUID128* - An array of 128 bit UUID hex strings

*shortName* - A string

*completeName* - A string

*txPower* - An integer value

*deviceClass* - A hex string

*pairingHashC* - A hex string

*pairingRandomizerR* - A hex string

*deviceId* - A hex string

*smOOBFlags* - A hex string

*intervalRange* - An array of hex strings

*solicitationUUID16* - An array of 16 bit UUID hex strings

*solicitationUUID32* - An array of 16 bit UUID hex strings

*solicitationUUID128* - An array of 16 bit UUID hex strings

*serviceData* - An array of hex strings

*publicAddress* - An array of hex strings

*randomAddress* - An array of hex strings

*appearance* - An array of bytes

*interval* - An array of hex strings

*deviceAddress* - An array of hex strings

*role* - An array of bytes or Buffer

*pairingHashC256* - An array of hex strings

*pairingRandomizerR256* - An array of hex strings

*serviceUUID32* - An array of 32 bit UUID hex strings

*serviceUUID128* - An array of 128 bit UUID hex strings

*_3dInfo* - An array of bytes or Buffer

*mfrData* - An array of bytes of Buffer

## License
MIT
