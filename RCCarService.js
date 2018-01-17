var bleno = require('bleno');
var util = require('util');
var virtual_gamepad = require('./input/virtual_gamepad');

var Throttle = require('./characteristics/throttle');
var Steering = require('./characteristics/steering');

let gamepad;

function RCCarService() {

  gamepad = new virtual_gamepad()
  gamepad.connect(function() {
    return callback(0);
  }, function(err) {
    return callback(-1);
  });

  bleno.PrimaryService.call(this, {
    uuid: '00000000-0000-1000-8000-00805F9B34F0',
    characteristics: [
      new Throttle(gamepad),
      new Steering(gamepad)
    ]
  });
};

util.inherits(RCCarService, bleno.PrimaryService);
module.exports = RCCarService;
