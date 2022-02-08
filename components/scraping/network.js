const express = require("express");
const service = require("../../services");
const router = express.Router();

router.get("/", get);

async function get(req, res, next) {
  let data = await service();
  res.status(200).send(data);
}

module.exports = router;
