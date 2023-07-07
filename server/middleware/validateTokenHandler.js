import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    res.status(401);
    throw new Error("Token not found");
  }
  token = authHeader?.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(403);
      throw new Error("Token is invalid");
    }
    req.user = decoded.user;
    next();
  });
});
