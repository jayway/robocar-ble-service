var bleno = require('bleno');
var os = require('os');
var RCCarService = require('./RCCarService');

var carService = new RCCarService();

console.log('bleno - RCCar (index)');

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising(`RCCar-${os.hostname()}`, [carService.uuid]);
  }else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {

  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
  if (!error) {
    bleno.setServices([
      carService
    ]);
  }
});
