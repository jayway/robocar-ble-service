const bleno = require('bleno');
const os = require('os');
const RCCarService = require('./RCCarService');

const carService = new RCCarService();

const hostName = process.env['BLENO_DEVICE_NAME'];
console.log(`Starting ${hostName} BLE service`);

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising(hostName, [carService.uuid]);
  } else {
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
