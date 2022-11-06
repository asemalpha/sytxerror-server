const { Router } = require("express");
const userRouter = new Router();

const User = require("../models/User.model");

const multer = require("multer");
const cloudinary = require("cloudinary");
const multerStorage = require("multer-storage-cloudinary");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const storage = new multerStorage.CloudinaryStorage({
  cloudinary: cloudinary.v2,
});

const upload = multer({ storage });

userRouter.get("/me", (req, res) => {
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

userRouter.patch("/:id", upload.single("logo"), (req, res, next) => {
  const id = req.params.id;
  let url;
  if (req.file) {
    url = req.file.path;
  }

  const {
    companyName,
    email,
    location,
    foundedDate,
    websiteUrl,
    sizeInEmployees,
    summary,
  } = req.body;

  let updatedObject;
  if (url) {
    updatedObject = {
      companyName,
      email,
      logo: url,
      location,
      foundedDate,
      websiteUrl,
      sizeInEmployees,
      summary,
    };
  } else {
    updatedObject = {
      companyName,
      email,
      location,
      foundedDate,
      websiteUrl,
      sizeInEmployees,
      summary,
    };
  }

  User.User.findOneAndUpdate({ _id: id }, updatedObject, { new: true })
    .then((post) => {
      res.json({ post });
    })
    .catch((error) => {
      next(error);
    });
});
userRouter.post("/signup", (req, res, next) => {
  const { companyName, email, password } = req.body;
  /*console.log(companyName);
  console.log(email);
  console.log(password);*/
  User.User.create({
    companyName,
    email,
    passwordHashAndSalt: password,
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
