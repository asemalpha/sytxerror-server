const { Router } = require("express");
const jobRouter = new Router();

const JobPost = require("../models/Jobs.model");

const isAuthenticated = require("../middleware/jwt.middleware");

jobRouter.post("/", (req, res, next) => {
  const {
    title,
    location,
    description,
    tasks,
    requirements,
    seniority,
    tech,
    category,
  } = req.body;

  JobPost.create({
    name: req.user._id,
    title,
    location,
    description,
    tasks,
    requirements,
    seniority,
    tech,
    category,
  })
    .then((post) => {
      return res.json({ post });
    })
    .catch((err) => {
      next(err);
    });
});
console.log(JobPost.Job.find);

jobRouter.get("/all", async (req, res, next) => {
  try {
    const jobPosts = await JobPost.Job.find();

    if (jobPosts) {
      res.json({ jobPosts });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

jobRouter.patch("/:id", (req, res, next) => {
  const id = req.params.id;

  const {
    title,
    location,
    description,
    tasks,
    requirements,
    seniority,
    tech,
    category,
  } = req.body;

  JobPost.findOneAndUpdate(
    { _id: id, creator: req.user._id },
    {
      title,
      location,
      description,
      tasks,
      requirements,
      seniority,
      tech,
      category,
    }
  )
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      next(err);
    });
});

jobRouter.delete("/:id", (req, res, next) => {
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

module.exports = jobRouter;
