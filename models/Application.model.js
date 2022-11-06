const { Schema, model } = require("mongoose");

const applicationSchema = new Schema(
  {
    candidateName: {
      type: String,
      required: true,
      minlength: 3,
    },
    candidateEmail: {
      type: String,
      required: true,
      minlength: 5,
    },
    candidateLocation: {
      type: String,
    },
    motivation: {
      type: String,
    },
    resumeUpload: {
      type: String,
    },
    linkdIn: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    jobID: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Application = model("Application", applicationSchema);

module.exports = Application;
