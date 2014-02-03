function Packet(dataType, data) {
  var type = Packet.ADTypes[dataType];

  if (type) {
    this.type = type.name;
    this.typeFlag = dataType;
    this.data = resolve(dataType, data);
    this.raw = data;
  }
  else {
    this.typeFlag = dataType;
    this.type = "Unknown";
    this.data = data;
    this.raw = data;
  }
}

Packet.ADTypes = {
    0x01 : { name : "Flags", resolve: null },
    0x02 : { name : "Incomplete List of 16-bit Service Class UUIDs", resolve: null },
    0x03 : { name : "Complete List of 16-bit Service Class UUIDs", resolve: null },
    0x04 : { name : "Incomplete List of 32-bit Service Class UUIDs", resolve: null },
    0x05 : { name : "Complete List of 32-bit Service Class UUIDs", resolve: null },
    0x06 : { name : "Incomplete List of 128-bit Service Class UUIDs", resolve: null },
    0x07 : { name : "Complete List of 128-bit Service Class UUIDs", resolve: null },
    0x08 : { name : "Shortened Local Name", resolve: null },
    0x09 : { name : "Complete Local Name", resolve: null },
    0x0A : { name : "Tx Power Level", resolve: null },
    0x0D : { name : "Class of Device", resolve: null },
    0x0E : { name : "Simple Pairing Hash C", resolve: null },
    0x0E : { name : "Simple Pairing Hash C-192", resolve: null },
    0x0F : { name : "Simple Pairing Randomizer R", resolve: null },
    0x0F : { name : "Simple Pairing Randomizer R-192", resolve: null },
    0x10 : { name : "Device ID", resolve: null },
    // 0x10 : { name : "Security Manager TK Value", resolve: null }
    0x11 : { name : "Security Manager Out of Band Flags", resolve : null },
    0x12 : { name : "Slave Connection Interval Range", resolve : null },
    0x14 : { name : "List of 16-bit Service Solicitation UUIDs", resolve : null },
    0x1F : { name : "List of 32-bit Service Solicitation UUIDs", resolve : null },
    0x15 : { name : "List of 128-bit Service Solicitation UUIDs", resolve : null },
    0x16 : { name : "Service Data", resolve : null },
    0x17 : { name : "Public Target Address", resolve : null },
    0x18 : { name : "Random Target Address", resolve : null },
    0x19 : { name : "Appearance" , resolve : null },
    0x1A : { name : "Advertising Interval" , resolve : null },
    0x1B : { name : "LE Bluetooth Device Address", resolve : null },
    0x1C : { name : "LE Role", resolve : null },
    0x1D : { name : "Simple Pairing Hash C-256", resolve : null },
    0x1E : { name : "Simple Pairing Randomizer R-256", resolve : null },
    0x20 : { name : "Service Data - 32-bit UUID", resolve : null },
    0x21 : { name : "Service Data - 128-bit UUID", resolve : null },
    0x3D : { name : "3D Information Data", resolve : null },
    0xFF : { name : "Manufacturer Specific Data", resolve : null },
}
console.log(Packet.ADTypes[0x08].name)
module.exports = Packet;