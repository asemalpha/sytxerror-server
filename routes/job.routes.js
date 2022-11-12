const { Router } = require("express");
const jobRouter = new Router();

const Job = require("../models/Jobs.model");

const { isLoggedIn } = require("../middleware/jwt.middleware");

jobRouter.get("/", (req, res) => {
  res.json("all good here as well");
});

jobRouter.get("/all", (req, res) => {
  const id = req.params._id;
  Job.find(id).then((job) => {
    if (!job) {
      return res.status(400).json({ errorMessage: "No jobs were found" });
    }
    res.json({ job });
  });
});

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

jobRouter.get("/creator/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const jobPosts = await Job.find({ creator: id });
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
