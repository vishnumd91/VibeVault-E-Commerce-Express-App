import express from "express";
import userRegistration from '../controller/registration.js';
const router = express.Router();

router.post("/register",userRegistration);

export default router;