#!/bin/bash
hciconfig hci0 up
export BLENO_DEVICE_NAME="robocar-$(cat /etc/hostname)"
. /home/pi/.nvm/nvm.sh
cd /home/pi/robocar-ble-service
npm start