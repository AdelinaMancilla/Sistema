const express = require("express");
const app = express();
const port = process.env.PORT || 80; //podría tomar el número de puerto del servicio hosting o el ya asignado

app.listen(port, () => console.log("server listening on port", port));

app.use(require("./routes"));
