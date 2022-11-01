const { Router } = require("express");
const slugify = require("slugify");
const isAuthinticated = require("../middleware/jwt.middleware");

const homePageRouter = Router();

homePageRouter.get("/", isAuthinticated, (req, res) => {});
