import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
} from "../controllers/userProfileControllers.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();
router.get("/", validateToken, getAllUsers);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/:id", validateToken, getUser);
router.delete("/:id", deleteUser);

export default router;
