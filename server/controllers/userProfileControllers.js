import asyncHandler from "express-async-handler"; // need to remove
import userProfile from "../models/userProfileSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export const getAllUsers = asyncHandler(async (req, res) => {
//   const users = await userProfile.find();
//   res.status(200).json(users);
// });

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password /*, contact, isAdmin, address */ } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  // hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new instance of the User model
  await userProfile.create({
    name,
    email,
    password: hashedPassword,
    // contact,
    // isAdmin,
    // address,
  });
  // Save the user to the database
  res.status(201).json("Registered successfully");
});

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All the fields are mandatory!");
    }

    const user = await userProfile.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("User not Found. Please Register to Login");
    }
    //compare the hashed password
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (isPasswordMatching) {
      const accessToken = jwt.sign(
        {
          user: {
            userName: user.name,
            email: user.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      // res.status(200).json({ accessToken });
      res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        samesite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days for cookie expiry
      });
    } else {
      res.status(401);
      throw new Error("email or password is not valid");
    }
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  } catch (err) {
    next(err);
  }
};

// export const getUser = asyncHandler(async (req, res) => {
//   console.log(req.user);
//   const user = await userProfile.findById(req.params.id);
//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }
//   res.status(200).json(user);
// });

// export const updateUser = asyncHandler(async (req, res) => {
//   const user = await userProfile.findById(req.params.id);
//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }
//   await userProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.status(200).json("User has been updated");
// });

// export const deleteUser = asyncHandler(async (req, res) => {
//   const user = await userProfile.findById(req.params.id);
//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }
//   await userProfile.findByIdAndDelete(req.params.id);
//   res.status(200).json("User deleted successfully");
// });
