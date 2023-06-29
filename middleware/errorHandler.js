import { constants } from "../constants.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status ? err.status : 500;
  let errorMessage;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      errorMessage = "Validation Failed";
      break;
    case constants.NOT_FOUND:
      errorMessage = "Not Found";
      break;
    case constants.UNAUTHORIZED:
      errorMessage = "Unauthorized";
      break;
    case constants.FORBIDDEN:
      errorMessage = "Forbidden";
      break;
    case constants.SERVER_ERROR:
      errorMessage = "Server Error";
      break;
    default:
      console.log("No Error, All good !");
      break;
  }
  return res.status(statusCode).json({
    error: errorMessage,
    message: err.message,
    stackTrace: err.stack,
  });
};
