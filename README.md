# Resin Artik10 Demo
Resin.io application to showcase an Artik-10 controlling a MIPI screen with a Infrared Proximity Sensor (Sharp GP2Y0A21YK)

## Configuration

### Infrared Proximity Sensor

Connect the sensor as shown below:

![Proxity](https://github.com/resin-io-projects/resin-artik10-demo/blob/master/wiring.png)

### SAMI
  * You need a Samsung account and a device created in the [SAMI](https://portal.samsungsami.io) dashboard
  * You need to create a new device type [here](https://devportal.samsungsami.io/#/devicetypes/new)
    * __Manifest__ - Upload [device_manifest.json](https://github.com/resin-io-projects/resin-artik10-demo/blob/master/device_manifest.json) from this repository.

### ENV config
  * `SAMI_URL` => __*string (optional)*__ ( defaults to `https://api.samsungsami.io/v1.1/messages` ) the SAMI endpoint
  * `SAMI_DEVICE_ID` => __*string (required)*__ The Device ID set in the SAMI dashboard
  * `SAMI_DEVICE_TOKEN` => __*string (required)*__ The Device token generated in the SAMI dashboard
  * `SENSOR_THRESHOLD` => __*string (optional)*__ The ADC threshold to activate the sensor
  * `POLL_INTERVAL` => __*number (optional)*__ Time in milliseconds to poll the sharp sensor
  * `DEVICE_NAME` => __*string (optional)*__ The Device name to send to SAMI

### Creating raw images for the MIPI screen

Use the following command to create a raw image for the MIPI screen. The input image should be 1080x1920.

```bash
ffmpeg -vcodec png -i input.png -vcodec rawvideo -f rawvideo -pix_fmt rgb32 output.raw

```
