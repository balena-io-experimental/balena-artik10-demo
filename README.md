# resin-artik5-ledmatrix
Resin.io application to showcase an artik-5 controlling a LED-Matrix and a PIR sensor

## Configuration

* #### PIR
![pir](https://learn.adafruit.com/system/assets/assets/000/013/829/medium800/proximity_PIRbackLabeled.jpg?1390935476)
  * Set the `Deelay Time Adjust` encoder to __*min*__
  * Set the `Sensitivity Adjust` encoder to __*min*__
  * Set the `Retrigger Setting` jumper to __*H*__

  * ###### ENV config
    * `PIR_PIN` => which Artik Digital PIN the PIR __*OUT*__ pin is connected
