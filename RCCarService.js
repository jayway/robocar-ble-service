var bleno = require('bleno');
var util = require('util');

var Throttle = require('./characteristics/throttle');
var Steering = require('./characteristics/steering');

function RCCarService() {

  bleno.PrimaryService.call(this, {
    uuid: '00000000-0000-1000-8000-00805F9B34F0',
    characteristics: [
      new ThrottleCharacteristic(),
      new SteeringCharacteristic()
    ]
  });
};

util.inherits(RCCarService, bleno.PrimaryService);
module.exports = RCCarService;
