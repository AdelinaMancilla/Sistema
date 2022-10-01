const mqtt = require("mqtt");
const pub = mqtt.connect("mqtt://test.mosquitto.org");
const topic = "6D";

//modelo mongoose
const { resultModel } = require("../Model/result");
//funciones para fecha y hora actual
const { getDate, getTime } = require("../Funciones/getDate");

/*------publisher-----*/
pub.on("connect", () => {
  setInterval(() => {
    const newResult = new resultModel({
      Humedad: 4080,
      Flujo: 1002,
      Fecha: getDate(),
      Tiempo: getTime(),
      Tiempo_bomba: "12:10:01",
      Dia_bomba: "27/09/2022",
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

module.exports = pub;
