const { Schema, model, default: mongoose } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    username: {
      type: String,
      unique: true,
      required: true,
      min: 4,
      max: 20,
    },
    role: {
      type: [],
      required: true,
    },
    jobtitle: {
      type: String,
    },
    location: {
      type: String,
    },
    company: {
      type: String,
    },
    jobsPosted: [
      {
        type: mongoose.Types.ObjectId,
        ref: "job",
      },
    ],
    servicePosted: [
      {
        type: mongoose.Types.ObjectId,
        ref: "service",
      },
    ],
    profilePic: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const userCollectionName = "User";
const User = model(userCollectionName, userSchema);

module.exports = { userCollectionName, User };
