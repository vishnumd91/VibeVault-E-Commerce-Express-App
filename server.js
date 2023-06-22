import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

// Middleware and Configurations
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.options("*", cors());

app.use("/", (req, res) => res.send("Vibe Vault Express App Root"));

app.listen(PORT, () => console.log(`Server Connected on port ${PORT}`));

connectDB();
