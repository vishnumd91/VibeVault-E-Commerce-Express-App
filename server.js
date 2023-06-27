import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDb } from "./config/dbConnection.js";
import userRouter from "./routes/userProfileRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 5001;

// Middleware and Configurations
app.use(errorHandler);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

//Route Configuration
app.use("/api", userRouter);

app.options("*", cors());

app.listen(port, () => console.log(`Server Connected on port ${port}`));
