const { Router } = require("express");
const userRouter = new Router();

const User = require("../models/User.model");

const multer = require("multer");
const cloudinary = require("cloudinary");
const multerStorage = require("multer-storage-cloudinary");
const { isAuthenticated, isLoggedIn } = require("../middleware/jwt.middleware");
const storage = new multerStorage.CloudinaryStorage({
  cloudinary: cloudinary.v2,
});

const upload = multer({ storage });

userRouter.get("/me", isAuthenticated, (req, res) => {
  const user = req.user;
  res.json({ user });
});

userRouter.get("/fullList", async (req, res, next) => {
  try {
    const allUsers = await User.User.find();
    if (allUsers) {
      res.json({ allUsers });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

userRouter.get(":id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findByID(id);
    if (user) {
      res.json({
        user: {
          _id: id,
          companyName: user.companyName,
          email: user.email,
          logo: user.logo,
          location: user.location,
          foundedDate: user.foundedDate,
          webSite: user.webSite,
          size: user.size,
          summary: user.summary,
        },
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});
userRouter.post("/profile/edit", isLoggedIn, (req, res, next) => {
  const { companyName, website, location, summary } = req.body;
  user._id;
  User.findByIdAndUpdate(
    id,
    { companyName, location, website, summary },
    { new: true }
  )
    .then((updatedUser) => {
      res.json({ user: updatedUser });
    })
    .catch((error) => {
      next(error);
    });
});

userRouter.post("/signup", (req, res, next) => {
  const { companyName, email, password } = req.body;

  User.create({
    companyName,
    email,
    password,
  })
    .then((post) => {
      return res.json({ post });
    })
    .catch((err) => {
      next(err);
    });
  return res.json({ success: "done" });
});

module.exports = userRouter;
