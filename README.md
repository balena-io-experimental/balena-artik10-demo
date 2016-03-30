# resin-artik5-ledmatrix
Resin.io application to showcase an artik-5 controlling a LED-Matrix and a PIR sensor

## Configuration

* #### PIR
![pir](https://learn.adafruit.com/system/assets/assets/000/013/829/medium800/proximity_PIRbackLabeled.jpg?1390935476)
  * Set the `Delay Time Adjust` encoder to __*min*__
  * Set the `Sensitivity Adjust` encoder to __*min*__
  * Set the `Retrigger Setting` jumper to __*L*__

  * ###### ENV config
    * `PIR_PIN` => __*int*__ ( defaults to `121` => J27 pin 2 ) which Artik Digital PIN the PIR __*OUT*__ pin is connected

* #### SAMI
  * You need a Samsung account and a device created in the [SAMI](https://portal.samsungsami.io) dashboard
  * You need to create a new device type [here](https://devportal.samsungsami.io/#/devicetypes/new)
    * __Manifest__
    ```javascript
    {
      "fields": [
        {
          "name": "sensor",
          "type": "CUSTOM",
          "valueClass": "String",
          "isCollection": false,
          "tags": []
        },
        {
          "name": "event",
          "type": "CUSTOM",
          "valueClass": "String",
          "isCollection": false,
          "tags": []
        }
      ],
      "actions": [
        {
          "name": "displayImage",
          "description": "tells the device which image to display",
          "isStandard": false,
          "type": "CUSTOM"
        },
        {
          "name": "reboot",
          "description": "reboots the device",
          "isStandard": false,
          "type": "CUSTOM"
        },
        {
          "name": "enablePir",
          "description": "tells the device to start sensing movement",
          "isStandard": false,
          "type": "CUSTOM"
        },
        {
          "name": "disablePir",
          "description": "tells the device to stop sensing movement",
          "isStandard": false,
          "type": "CUSTOM"
        }
      ],
      "messageFormat": "json"
    }
    ```
  * ###### ENV config
    * `SAMI_URL` => __*string*__ ( defaults to `https://api.samsungsami.io/v1.1/messages` ) the SAMI endpoint
    * `SAMI_DEVICE_ID` => __*string*__ the Device ID set in the SAMI dashboard
    * `SAMI_DEVICE_TOKEN` => __*string*__ the Device token generated in the SAMI dashboard
