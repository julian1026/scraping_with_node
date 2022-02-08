const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const router = require("./components/scraping/network");
const app = express();

app.use(bodyparser.json());
app.use(cors());
app.use("/api/scraping", router);
app.listen(3002, () => {
  console.log("escuchando en el puerto 3002");
});
