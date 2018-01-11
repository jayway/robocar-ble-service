var bleno = require('bleno');

var RCCarService = require('./RCCarService');

var carService = new RCCarService();

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {

    bleno.startAdvertising(bleno.name, [carService.uuid]);
  }
  else {

    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {

  console.log('on -> advertisingStart: ' +
    (error ? 'error ' + error : 'success')
  );

  if (!error) {

    bleno.setServices([
      carService
    ]);
  }
});
