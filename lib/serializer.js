// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

ADTypes = {
    flags : { typeFlag : 0x01, resolve: intArrayToByte },
    incompleteUUID16 : { typeFlag : 0x02, resolve: octetStringArrayToBuffer },
    completeUUID16 : { typeFlag : 0x03, resolve: octetStringArrayToBuffer },
    incompleteUUID32 : { typeFlag : 0x04, resolve: octetStringArrayToBuffer },
    completeUUID32 : { typeFlag : 0x05, resolve: octetStringArrayToBuffer },
    incompleteUUID128 : { typeFlag : 0x06, resolve: octetStringArrayToBuffer },
    completeUUID128 : { typeFlag : 0x07, resolve: octetStringArrayToBuffer },
    shortName : { typeFlag : 0x08, resolve: stringToBuffer },
    completeName : { typeFlag : 0x09, resolve: stringToBuffer },
    txPower : { typeFlag : 0x0A, resolve: signedIntToBuffer },
    deviceClass : { typeFlag : 0x0D, resolve: octectStringToBuffer },
    pairingHashC : { typeFlag : 0x0E, resolve: octectStringToBuffer },
    pairingRandomizerR : { typeFlag : 0x0F, resolve: octectStringToBuffer },
    deviceId : { typeFlag : 0x10, resolve: octectStringToBuffer },
    smOOBFlags : { typeFlag : 0x11, resolve: octectStringToBuffer },
    intervalRange : { typeFlag : 0x12, resolve: octetStringArrayToBuffer },
    solicitationUUID16 : { typeFlag : 0x14, resolve: octetStringArrayToBuffer },
    solicitationUUID32 : { typeFlag : 0x1F, resolve: octetStringArrayToBuffer },
    solicitationUUID128 : { typeFlag : 0x15, resolve: octetStringArrayToBuffer },
    serviceData : { typeFlag : 0x16, resolve: octetStringArrayToBuffer },
    publicAddress : { typeFlag : 0x17, resolve: octetStringArrayToBuffer },
    randomAddress : { typeFlag : 0x18, resolve: octetStringArrayToBuffer },
    appearance : { typeFlag : 0x19, resolve: arrayToBuffer },
    interval : { typeFlag : 0x1A, resolve: octetStringArrayToBuffer },
    deviceAddress : { typeFlag : 0x1B, resolve: octetStringArrayToBuffer },
    role : { typeFlag : 0x1C, resolve: arrayToBuffer },
    pairingHashC256 : { typeFlag : 0x1D, resolve: octetStringArrayToBuffer },
    pairingRandomizerR256 : { typeFlag : 0x1E, resolve: octetStringArrayToBuffer },
    serviceUUID32 : { typeFlag : 0x20, resolve: octetStringArrayToBuffer },
    serviceUUID128 : { typeFlag : 0x21, resolve: octetStringArrayToBuffer },
    _3dInfo : { typeFlag : 0x3D, resolve: arrayToBuffer },
    mfrData : { typeFlag : 0xFF, resolve: arrayToBuffer }
}

function intArrayToByte(data){
  var ret = 0;
  for (var i=0; i<data.length; i++){
    ret |= data[i];
  }
  return Buffer([ret]);
}

function stringToBuffer(data){
  return new Buffer(data);
}

function octectStringToBuffer(data){
  var numBytes = data.length/2;

  var buf = new Buffer(numBytes);

  if (numBytes % 2) {
    throw new Error("Invalid UUID" + data + ".");
  }

  for (var i = 0; i < numBytes; i++) {
    buf.writeUInt8(parseInt(data.substr((i*2), 2), 16), numBytes-i-1);
  }

  return buf;
}

function octetStringArrayToBuffer(data){
  var buffs = [];
  for (var i=0; i< data.length; i++){
    buffs.push(octectStringToBuffer(data[i]));
  }
  return Buffer.concat(buffs);
}

function signedIntToBuffer(data){
  var buf = new Buffer(1);
  buf.writeInt8(data, 0);
  return buf;
}

function arrayToBuffer(data){
  return new Buffer(data);
}

function serialize(advertisement){
  var buffs = [];
  Object.keys(advertisement).forEach(function(key){
    typeFlag = ADTypes[key].typeFlag;
    data = ADTypes[key].resolve(advertisement[key]);
    buffs.push(new Buffer([data.length+1, typeFlag]));
    buffs.push(data);
  });
  var ret = Buffer.concat(buffs);
  if (ret.length > 32){
    throw(new Error("Packet exceeds maximum length of 32 bytes"));
  } else {
    return ret;
  }
}

module.exports.serialize = serialize;
