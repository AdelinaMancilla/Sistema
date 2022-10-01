const mqtt = require("mqtt");
const sub = mqtt.connect("mqtt://test.mosquitto.org");
const topic = "6D";

/*------subscriber-----*/
//se realiza la subscripción al topic
sub.on("connect", () => {
  sub.subscribe(topic, (err) => {
    if (err) {
      console.log(err, "err");
    }
  });
});

sub.on("message", (topic, message) => {
  console.log(message.toString());
});

module.exports = sub;
