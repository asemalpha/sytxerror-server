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
    linkedinUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    photo: {
      type: String,
    },
    jobId: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const applicationCollectionName = "Application";
const Application = model(applicationCollectionName, applicationSchema);

module.exports = { applicationCollectionName, Application };
