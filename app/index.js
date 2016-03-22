(function() {
  'use strict';

  const samiURL = process.env.SAMI_URL || "https://api.samsungsami.io/v1.1/messages";
  const bearer = "Bearer "+process.env.SAMI_DEVICE_TOKEN || null;
  const device_id = process.env.SAMI_DEVICE_ID|| null;
  const Client = require('node-rest-client').Client;
  const pir = require("pi-pins").connect(parseInt(process.env.PIR_PIN) || 121);
  const sami = new Client();
  pir.mode('in');

  pir.on('rise', function () {       // …or `'fall'`, or `'both'`
      console.log("Movement detected! PIN value is "+pir.value());
      push2sami(function pushed(err,response) {
        if (!err) {
          console.log("Movement detection reported to SAMI");
        } else {
          console.error(err);
        }
      });
  });

  function push2sami (cb) {
    if (bearer && device_id) {
      let args= {
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearer
            },
        data: {
            "sdid": device_id,
            "ts": new Date().valueOf(),
            "type": "message",
            "data": "Movement"
        }
      };
      sami.post(samiURL, args, function(data, response) {
         cb(null,response);
      });

    } else {
      cb("missing device parameter/s (id,token).");
    }
  }

})();
