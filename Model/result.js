const mongoose = require("mongoose");

//Definimos Schema
let resultSchema = new mongoose.Schema({
  Humedad: Number,
  Flujo: Number,
  Fecha: String,
  Tiempo: String,
  Tiempo_bomba: String,
  Dia_bomba: String,
});

//Definimos el modelo
const resultModel = mongoose.model("Result", resultSchema);
module.exports = { resultModel };
