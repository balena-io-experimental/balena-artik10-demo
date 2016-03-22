(function() {
  'use strict';

  const pir = require("pi-pins").connect(parseInt(process.env.PIR_PIN) || 121);
  pir.mode('in');

  pir.on('rise', function () {       // …or `'fall'`, or `'both'`
      console.log("Movement detected!");
  });

})();
