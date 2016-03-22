(function() {
  'use strict';

  const pin121 = require("pi-pins").connect(121);
  pin121.mode('in');

  pin121.on('rise', function () {       // …or `'fall'`, or `'both'`
      console.log("Movement detected!");
  });

})();
