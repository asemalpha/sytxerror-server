const express = require("express");
const router = express.Router();
const applicationRouter = require("./application.routes");
const authRoutes = require("./auth.routes");
const jobRouter = require("./job.routes");
const userRouter = require("./user.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/application", applicationRouter);
router.use("/auth", authRoutes);
router.use("/user", userRouter);
router.use("/job", jobRouter);

module.exports = router;
