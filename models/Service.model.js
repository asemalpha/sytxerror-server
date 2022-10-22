const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
    },
    servicetype: {
      type: String,
      required: true,
    },
    category: {
      type: ["Software", "Hardware", "Networking"],
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    postdate: new Date(),
    status: {
      type: Boolean,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const serviceCollectionName = "Service";
const Service = model(serviceCollectionName, serviceSchema);

module.exports = { serviceCollectionName, Service };
