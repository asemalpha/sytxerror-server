const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User.model");
const isAuthinticated = require("../middleware/jwt.middleware");

const profileRouter = express.Router();

profileRouter.post("/edit", isAuthinticated, (req, res) => {
  const { username, name, email } = req.body;
  const { user } = req;

  if (!username) {
    return res.status(400).json({ message: "Please provide your username" });
  }
  if (!name) {
    return res.status(400).json({ message: "Please provide your name" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  User.findOne({
    $or: [{ username }, { email }],
    _id: { $ne: user._id },
  }).then((foundUser) => {
    if (foundUser) {
      return res.status(400).json({ message: "hold up" });
    }
    User.findByIdAndUpdate(
      user._id,
      { name, username, email },
      { new: true }
    ).then((updatedUser) => {
      const token = jwt.sign(
        { _id: user._id, username: updatedUser.username },
        process.env.TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: "12h" }
      );
      res.json({ user: updatedUser, token });
    });
  });
});

module.exports = profileRouter;
