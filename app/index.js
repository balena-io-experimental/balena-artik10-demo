(function() {
  'use strict';

  const samiURL = process.env.SAMI_URL || "https://api.samsungsami.io/v1.1";
  const device_token = process.env.SAMI_DEVICE_TOKEN || null;
  const device_id = process.env.SAMI_DEVICE_ID|| null;
  const sensor_threshold = process.env.SENSOR_THRESHOLD || 2500;
  const poll_interval = process.env.POLL_INTERVAL || 250; // Defaults to 0.25 second
  const device_name = process.env.DEVICE_NAME || "wild-fire";

  var Sami = require('node-sami');
  var fs = require('fs');
  const exec = require('child_process').exec;
  var express = require('express');
  var app = express();
  var last_detection = false;
  var image_selector = 0;
  const sami = new Sami({
      baseUrl: samiURL,
      token: device_token
  });
  var sensor_active_images = ["/usr/src/app/assets/bernie.raw",
                              "/usr/src/app/assets/donald.raw",
                              "/usr/src/app/assets/hillary.raw",
                              "/usr/src/app/assets/john.raw",
                              "/usr/src/app/assets/ted.raw"];

  display_image_raw("/usr/src/app/assets/red.raw");
  // enable_proximity_sensor();

  /**
  * Function that enables proximity sensor
  */
  function enable_proximity_sensor() {
    display_image_raw("/usr/src/app/assets/green.raw")
    setInterval(function() {
      if (read_adc0() > sensor_threshold) {
        if (last_detection == false) {
          proximity_actions();
        }
        last_detection = true;
      }else{
        last_detection = false;
      }
    }, poll_interval);
  }

  /**
  * Actions to execute on proximity.
  */
  function proximity_actions() {
    display_image_raw(sensor_active_images[image_selector]);
    image_selector++;
    if (image_selector >= sensor_active_images.length) {
      image_selector=0;
    }
    push2sami();
  }

  // Code to ensure that the screen does not sleep
  const screen_unblank_interval = 5*60*1000;
  unblank_screen();
  setInterval(function(){
    unblank_screen();
  }, screen_unblank_interval);

  /**
  * Pushes a message to SAMI
  */
  function push2sami () {
    if(device_token && device_id){
      sami.messages.sendMessageAction(
          {
            "sdid": device_id,
            "ts": new Date().valueOf(),
            "type": "message",
            "data": {
                "uuid": process.env.RESIN_DEVICE_UUID,
                "sensor": "Proximity",
                "event": "Movement",
                "name": device_name
            }
      }, function(error, response) {
        if (error) console.log(error);
      });
    } else {
      console.log("Missing environment variable SAMI_DEVICE_TOKEN/SAMI_DEVICE_ID");
    }
  }

  /**
  * Unblank fb0 screen
  */
  function unblank_screen(){
    fs.access('/sys/class/graphics/fb0/blank', fs.F_OK, function(err) {
      if (!err) {
        exec('echo 0 > /sys/class/graphics/fb0/blank', (error, stdout, stderr) => {
          if (stderr) {
            console.log(stderr);
          }
        });
      } else {
        console.log("MPI screen missing.");
      }
    });
  }

  /**
  * Display image on screen fb0
  * @param {string} image
  */
  function display_image(image){
    exec('fbi -T 2 '+ image, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      }
    });
  }

  /**
  * Display raw image on screen fb0
  * @param {string} image
  */
  function display_image_raw(image){
    exec('cat '+ image + ' > /dev/fb0', (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      }
    });
  }

  /* Read ADC0 for Artik10 - Note the hardcoded sys path for the sensor
  */
  function read_adc0(){
    return parseInt(fs.readFileSync('/sys/devices/12d10000.adc/iio:device0/in_voltage0_raw'));
  }

  // Sensor failover
  app.get('/', function (req, res) {
    res.send('Hey SDC!');
  });

  app.get('/activate',function (req, res) {
    enable_proximity_sensor();
    res.send('Activated!');
  });

  app.get('/trigger', function (req, res) {
    proximity_actions();
    last_detection = true;
    res.send("Triggered!");
  })

  app.get('/adc0',function (req, res) {
    res.send(read_adc0().toString());
  });

  app.listen(80, function () {
    console.log('All Set!');
  });

})();
