import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
} from "../controllers/userProfileControllers.js";
const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;
