import asyncHandler from "express-async-handler";
import userProfile from "../models/userProfileSchema.js";
import bcrypt from "bcrypt";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userProfile.find();
  res.status(200).json(users);
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, contact, password, address } = req.body;
  if (!name || !email || !contact || !password) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  // Check if the email already exists in the database
  // const existingUser = await userProfile.findOne({ email: email });

  // if (existingUser) {
  //   // If the user already exists, return an error
  //   return res
  //     .status(409)
  //     .json({ message: "User with this email already exists" });
  // }
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new instance of the User model
  await userProfile.create({
    name,
    email,
    contact,
    password: hashedPassword,
    address,
  });
  // Save the user to the database

  res.status(201).json("Registered successfully");
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await userProfile.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userProfile.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await userProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json("User has been updated");
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await userProfile.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await userProfile.findByIdAndDelete(req.params.id);
  res.status(200).json("User deleted successfully");
});


//loginuser