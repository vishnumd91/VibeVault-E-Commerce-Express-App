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
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    // contact: {
    //   type: Number,
    //   default: 0,
    //   required: false,
    //   // required: [true, "Please add the user contact number"],
    //   // min: [10, "Please enter atleast 10 digit phone number"],
    //   // unique: [true, "Phone number already taken"],
    //   // validate: {
    //   //   validator: async (value) => {
    //   //     const user = await userProfile.findOne({ contact: value });
    //   //     return !user;
    //   //   },
    //   //   message: "Phone numer must be unique",
    //   // },
    // },
    // address: {
    //   type: String,
    //   default: "",
    //   required: false,
    // },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    //   required: false,
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserProfile", userProfileSchema);
