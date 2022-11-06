const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const { userCollectionName } = require("./User.model");
const { applicationCollectionName } = require("./Application.model");

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

    tasks: {
      type: [],
      minlength: 1,
      required: true,
    },

    requirements: {
      type: [],
      required: true,
    },

    seniority: {
      type: String,
      required: true,
      enum: ["Junior", "Mid", "Senior"],
    },

    tech: [
      {
        type: String,
        required: true,
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

    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Fullstack"],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Job = model("Job", jobSchema);
module.exports = Job;
