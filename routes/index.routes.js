const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.use("/");

module.exports = router;
