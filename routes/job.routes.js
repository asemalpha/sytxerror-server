const { Router } = require("express");
const jobRouter = new Router();

const Job = require("../models/Jobs.model");

const { isAuthenticated, isLoggedIn } = require("../middleware/jwt.middleware");

jobRouter.post("/create", isLoggedIn, (req, res, next) => {
  const { title, location, description, seniority, tech } = req.body;

  Job.create({
    creator: req.user._id,
    title,
    location,
    description,
    seniority,
    tech,
  })
    .then((post) => {
      // returning -> post
      //  returning -> { post: post }

      return res.json({ post });
    })
    .catch((err) => {
      next(err);
    });
});

jobRouter.get("/all", async (req, res, next) => {
  try {
    const jobPosts = await Job.Job.find();

    if (jobPosts) {
      res.json({ jobPosts });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

jobRouter.delete("/:id", isAuthenticated, (req, res, next) => {
  const id = req.params.id;

  JobPost.findOneAndDelete({ _id: id, creator: req.user._id })
    .then(() => res.json({}))
    .catch((err) => {
      next(err);
    });
});

jobRouter.get("/creator/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const jobPosts = await JobPost.find({ creator: id });
    if (jobPosts) {
      res.json({ jobPosts });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

jobRouter.get("/:jobIdThatUserMustSend", (req, res) =>
  Job.findById(req.params.jobIdThatUserMustSend).then((job) =>
    res.json({ job })
  )
);

module.exports = jobRouter;
