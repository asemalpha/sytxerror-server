const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const User = require("./User.model");
const Application = require("./Application.model");

const jobSchema = new Schema(
  {
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    seniority: {
      type: String,
      required: true,
    },

    tech: [
      {
        type: String,
        required: true,
        default: "CSS",
        enum: [
          "HTML",
          "CSS",
          "NodeJS",
          "React",
          "VueJS",
          "AngularJS",
          "Python",
          "Swift",
          "MongoDB",
          "Java",
          "SQL",
          "GraphQL",
          "AWS",
          "Git",
          "Flask",
          "Ruby",
          "Express",
          "Javascript",
          "Bootstrap",
          "SASS",
          "PHP",
          ".NET",
          "C#",
          "C++",
        ],
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Job = model("Job", jobSchema);
module.exports = Job;
