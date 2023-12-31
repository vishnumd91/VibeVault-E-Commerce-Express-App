import mongoose from "mongoose";
import userProfile from "../models/userProfileSchema.js";

const userProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "email address already taken"],
      validate: {
        validator: async (value) => {
          const user = await userProfile.findOne({ email: value });
          return !user;
        },
        message: "Email address must be unique",
      },
    },
    contact: {
      type: Number,
      required: [true, "Please add the user contact number"],
      min: [10, "Please enter atleast 10 digit phone number"],
      unique: [true, "Phone number already taken"],
      validate: {
        validator: async (value) => {
          const user = await userProfile.findOne({ contact: value });
          return !user;
        },
        message: "Phone numer must be unique",
      },
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    address: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserProfile", userProfileSchema);
