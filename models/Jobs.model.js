const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
    },
    company: {
      type: String,
      required: true,
      min: 3,
    },
    location: {
      type: String,
      required: true,
    },
    postdate: new Date(),
    startdate: new Date(),
    jobaddress: {
      type: String,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const jobCollectionName = "Job";
const Job = model(jobCollectionName, jobSchema);
module.exports = { jobCollectionName, Job };
