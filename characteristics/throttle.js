var bleno = require('bleno');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var ThrottleCharacteristic = function(gamepad) {
 ThrottleCharacteristic.super_.call(this, {
    uuid: '00000000-0000-1000-8000-00805F9B34F1',
    properties: ['read', 'write', 'writeWithoutResponse', 'notify'],
    value: 0
  });

 this._value = new Buffer(0);
 this._updateValueCallback = null;
 this.gamepad = gamepad;
};

ThrottleCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log('ThrottleCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));

  callback(this.RESULT_SUCCESS, this._value);
};

ThrottleCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  this._value = data;

  //console.log('data: ', data);
  //console.log('hex: ', data.toString('hex'));
  let event = {type: 0x03, code: 0x05, value: (data.readInt8(0) + 127)}
  this.gamepad.sendEvent(event)
  
  //console.log('ThrottleCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));
  if (this._updateValueCallback) {
    console.log('ThrottleCharacteristic - onWriteRequest: notifying');

    this._updateValueCallback(this._value);
  }

  callback(this.RESULT_SUCCESS);
};

ThrottleCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('ThrottleCharacteristic - onSubscribe');

  this._updateValueCallback = updateValueCallback;
};

ThrottleCharacteristic.prototype.onUnsubscribe = function() {
  console.log('ThrottleCharacteristic - onUnsubscribe');

  this._updateValueCallback = null;
};


util.inherits(ThrottleCharacteristic, BlenoCharacteristic);
module.exports = ThrottleCharacteristic;
