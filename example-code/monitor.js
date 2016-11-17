var twilio = require('twilio')(/*twilioAccountSid*/, /*twilioAuthToken*/);
var moment = require('moment');
var fs = require('fs');
var status = false;
var current = false;
var lastRun = false;

fs.readFile('./door-sensor.txt', 'utf8', function (err, data) {
  if(typeof data === 'undefined') console.log('File Not Found: ./door-sensor.txt');
  else {
    data = data.split("= ");
    if(typeof data[1] !== 'undefined') {
      var vals = {
        sensor: (typeof data[1] !== 'undefined') ? data[1].split(" ")[0].trim() : null,
        output: (typeof data[2] !== 'undefined') ? data[2].replace(/(\r\n|\n|\r)/gm,"") : null
      };
      
      if(!vals.sensor || !vals.output) {
        console.log('No sensor data found');
        console.log(vals.sensor, vals.output);
      }
      else {
        current = (vals.output < 105) ? "closed" : "open";
        if(current == "open" && (!lastRun || moment().diff(lastRun, 'seconds') > 30)) {
          lastRun = moment().format();
          
          twilio.sendMessage({
              body: "Sensor open",
              to: '+15555555555',
              from: /*twilioAccountNumber*/
          }, function(err, message) {
              if(err) console.log(err);
          });
        }
      }
    }
  }
});