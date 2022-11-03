const { Schema, model, default: mongoose } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    companyName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    passwordHashAndSalt: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default:
        "https://res.cloudinary.com/dlfxinw9v/image/upload/v1598346625/default-logo-vanilla-jobs_jdt2uq.png",
    },
    location: {
      type: String,
    },
    foundedDate: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    sizeInEmployees: {
      type: String,
    },
    summary: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const userCollectionName = "User";
const User = model(userCollectionName, userSchema);

module.exports = { userCollectionName, User };
