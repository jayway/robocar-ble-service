var bleno = require('bleno');
var BlenoPrimaryService = bleno.PrimaryService;

var Throttle = require('./characteristics/throttle');
var Steering = require('./characteristics/steering');

console.log('bleno - RCCar (main)');

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('RCCar', ['00000000-0000-1000-8000-00805F9B34F0']);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: '00000000-0000-1000-8000-00805F9B34F0',
        characteristics: [
          new Throttle(),
          new Steering()
        ]
      })
    ]);
  }
});