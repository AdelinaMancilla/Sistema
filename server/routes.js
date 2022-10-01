const express = require("express");
const router = express.Router(); //enrutador
const resultSchema = require("./../Model/result");

//Obtener datos
router.get("/", (req, res) => {
  resultSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
