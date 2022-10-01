const mqtt = require("mqtt");
const mongoose = require("mongoose");
require("dotenv").config();

//modelo mongoose
const { resultModel } = require("./Model/result");
//funciones para fecha y hora actual
const { getDate, getTime } = require("./Funciones/getDate");

//Para conectarse al broker
const broker = mqtt.connect("mqtt://test.mosquitto.org");
const sub = mqtt.connect("mqtt://test.mosquitto.org");
const pub = mqtt.connect("mqtt://test.mosquitto.org");
const topic = "6D";

//conexión a la base de datos
try {
  mongoose.connect(
    process.env.MONGODB_URI,
    console.log("Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}

broker.on("connect", () => {
  //el evento se lanza cuando se realizo la conexión al broker publico
  console.log("Broker ready");
});

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

/*------publisher-----*/
pub.on("connect", () => {
  setInterval(() => {
    const newResult = new resultModel({
      Humedad: 4080,
      Flujo: 1002,
      Fecha: getDate(),
      Tiempo: getTime(),
      Tiempo_bomba: getTime(),
      Dia_bomba: getDate(),
    });
    try {
      newResult.save();
      //console.log(newResult);
    } catch (error) {
      console.log(error);
    }
    pub.publish(topic, JSON.stringify(newResult));
    console.log("Message send!");
  }, 10000);
});

pub.on("close", function () {
  console.log("Connection closed by client");
});

pub.on("reconnect", function () {
  console.log("Client trying a reconnection");
});
