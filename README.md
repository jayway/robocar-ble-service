# robocar-ble-service

## Prepare the board
### Bluez
You need to make sure that you have bluez >= v5 installed on your system.
Check version by typing:

```
hcitool | grep ver
```
If it's not instaled or not new enough update with:

```
sudo apt-get install pi-bluetooth
```

In order for the Bleno library to work you need to stop the bluetooth daemon.
The following command will stop the daemon and print the status of the daemon to verify that it has been stopped.

```
sudo systemctl stop bluetooth
sudo systemctl status bluetooth
```

If the service is stopped correctly the output of the status should output something like this:

```
bluetooth.service - Bluetooth service
   Loaded: loaded (/lib/systemd/system/bluetooth.service; enabled)
   Active: inactive (dead) since Mon 2016-04-04 06:58:30 UTC; 4s ago
     Docs: man:bluetoothd(8)
 Main PID: 584 (code=exited, status=0/SUCCESS)
   Status: "Quitting"
```

The above command will only stop the daemon temporarily. It will start again upon next bootup.
If you would like to permanently disable the daemon issue:

```
sudo systemctl disable bluetooth
```
If you need the daemon after disabling the daemon You can power up the Bluetooth adapter after stopping the bluetooth daemon. 

```
sudo hciconfig hci0 up
```
### Node.js

Install Node.js 

### git
Install git to the system to be able to clone this repositore to the system.

```
sudo apt-get update
sudo apt-get install git libudev-dev
```
## Clone install and run
walk to the directory where you cloned this project, an run ```npm install```
Then you start the service with ```sudo node index.js```
