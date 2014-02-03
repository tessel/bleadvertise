function Packet(dataType, data, byteOrder) {
  this.typeFlag = dataType;
  this.raw = data;
  this.byteOrder = byteOrder;

  if (data && !Buffer.isBuffer(data)) {
    throw new Error("Data must be a buffer");
  }

  var type = Packet.ADTypes[dataType];

  if (type) {
    this.type = type.name;
    this.data = type.resolve ? type.resolve(data, dataType, byteOrder) : data;
  }
  else {
    this.type = "Unknown";
    this.data = data;
  }
}

Packet.ADTypes = {
    0x01 : { name : "Flags", resolve: toStringArray },
    0x02 : { name : "Incomplete List of 16-bit Service Class UUIDs", resolve: toOctetStringArray.bind(null, 2)},
    0x03 : { name : "Complete List of 16-bit Service Class UUIDs", resolve: toOctetStringArray.bind(null, 2) },
    0x04 : { name : "Incomplete List of 32-bit Service Class UUIDs", resolve: toOctetStringArray.bind(null, 4) },
    0x05 : { name : "Complete List of 32-bit Service Class UUIDs", resolve: toOctetStringArray.bind(null, 4) },
    0x06 : { name : "Incomplete List of 128-bit Service Class UUIDs", resolve: toOctetStringArray.bind(null, 16) },
    0x07 : { name : "Complete List of 128-bit Service Class UUIDs", resolve: toOctetStringArray.bind(null, 16) },
    0x08 : { name : "Shortened Local Name", resolve: toString },
    0x09 : { name : "Complete Local Name", resolve: toString },
    0x0A : { name : "Tx Power Level", resolve: toSignedInt },
    0x0D : { name : "Class of Device", resolve: toOctetString.bind(null, 3) },
    0x0E : { name : "Simple Pairing Hash C", resolve: toOctetString.bind(null, 16) },
    0x0F : { name : "Simple Pairing Randomizer R", resolve: toOctetString.bind(null, 16) },
    0x10 : { name : "Device ID", resolve: toOctetString.bind(null, 16) },
    // 0x10 : { name : "Security Manager TK Value", resolve: null }
    0x11 : { name : "Security Manager Out of Band Flags", resolve : toOctetString.bind(null, 16) },
    0x12 : { name : "Slave Connection Interval Range", resolve : toOctetStringArray.bind(null, 2) },
    0x14 : { name : "List of 16-bit Service Solicitation UUIDs", resolve : toOctetStringArray.bind(null, 2) },
    0x1F : { name : "List of 32-bit Service Solicitation UUIDs", resolve : toOctetStringArray.bind(null, 4) },
    0x15 : { name : "List of 128-bit Service Solicitation UUIDs", resolve : toOctetStringArray.bind(null, 8) },
    0x16 : { name : "Service Data", resolve : toOctetStringArray.bind(null, 1) },
    0x17 : { name : "Public Target Address", resolve : toOctetStringArray.bind(null, 6) },
    0x18 : { name : "Random Target Address", resolve : toOctetStringArray.bind(null, 6) },
    0x19 : { name : "Appearance" , resolve : null },
    0x1A : { name : "Advertising Interval" , resolve : toOctetStringArray.bind(null, 2)  },
    0x1B : { name : "LE Bluetooth Device Address", resolve : toOctetStringArray.bind(null, 6) },
    0x1C : { name : "LE Role", resolve : null },
    0x1D : { name : "Simple Pairing Hash C-256", resolve : toOctetStringArray.bind(null, 16) },
    0x1E : { name : "Simple Pairing Randomizer R-256", resolve : toOctetStringArray.bind(null, 16) },
    0x20 : { name : "Service Data - 32-bit UUID", resolve : toOctetStringArray.bind(null, 4) },
    0x21 : { name : "Service Data - 128-bit UUID", resolve : toOctetStringArray.bind(null, 16) },
    0x3D : { name : "3D Information Data", resolve : null },
    0xFF : { name : "Manufacturer Specific Data", resolve : null },
}

function toStringArray(data, dataType) {
  var arr = [];

  if (dataType & (1 << 0)) {
    arr.push('LE Limited Discoverable Mode');
  }
  if (dataType & (1 << 1)) {
    arr.push('LE General Discoverable Mode');
  }
  if (dataType & (1 << 2)) {
    arr.push('BR/EDR Not Supported');
  }
  if (dataType & (1 << 3)) {
    arr.push('Simultaneous LE and BR/EDR to Same Device Capable (Controller)');
  }
  if (dataType & (1 << 4)) {
    arr.push('Simultaneous LE and BR/EDR to Same Device Capable (Host)');
  }

  if (!arr.length) {
    arr.push('None');
  }

  return arr;
}

function toOctetStringArray(numBytes, data, dataType, byteOrder) {
  var uuids = [];

  var bytes;

  if (!data) return [];

  if (numBytes > data.length) {
    throw new Error("Not enough bytes for single UUID");
  }

  if (data.length % numBytes) {
    throw new Error("Not enough bytes to complete each UUID. Needs to be multiple of", numBits);
  }

  while (data) {

    var uuid = toOctetString(numBytes, data, dataType, byteOrder);
    
    uuids.push(uuid);

    data = data.slice(numBytes, data.length);

    if (!data || !data.length) data = null;
  }

  return uuids;
}

function toString(data) {
  return data.toString('utf8');
}

function toSignedInt(data) {
  if (!data) return 0;
  return data.readInt8(0);
}

function toOctetString(numOctets, data, dataType, byteOrder) {
  var bytes = [];
  for (var i = 0; i < numOctets; i++) {
    var str = data.readUInt8(i).toString(16);
    if (str.length == 1) str = "0" + str;
    bytes.push(str);
  }

  if (byteOrder == "BE") {
    bytes.reverse();
  }

  var uuid = "0x" + bytes.join('');

  return uuid;
}

module.exports.Packet = Packet;
module.exports.toOctetStringArray = toOctetStringArray;
