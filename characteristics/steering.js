var bleno = require('bleno');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var SteeringCharacteristic = function() {
 SteeringCharacteristic.super_.call(this, {
    uuid: '00000000-0000-1000-8000-00805F9B34F2',
    properties: ['read', 'write', 'writeWithoutResponse', 'notify'],
    value: 0
  });

 this._value = new Buffer(0);
 this._updateValueCallback = null;
};

SteeringCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log('SteeringCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));

  callback(this.RESULT_SUCCESS, this._value);
};

SteeringCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  this._value = data;

  console.log('SteeringCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));

  if (this._updateValueCallback) {
    console.log('SteeringCharacteristic - onWriteRequest: notifying');

    this._updateValueCallback(this._value);
  }

  callback(this.RESULT_SUCCESS);
};

SteeringCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('SteeringCharacteristic - onSubscribe');

  this._updateValueCallback = updateValueCallback;
};

SteeringCharacteristic.prototype.onUnsubscribe = function() {
  console.log('SteeringCharacteristic - onUnsubscribe');

  this._updateValueCallback = null;
};


util.inherits(SteeringCharacteristic, BlenoCharacteristic);
module.exports = SteeringCharacteristic;
