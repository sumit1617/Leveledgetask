const ErrorHandler = require("../utils/errorHandle");
const catchAsyncErrors = require("./catchAsyncErrors.js");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token found in Authorization header, check cookies
  if (!token) {
    token = req.cookies.token;
  }

  console.log("Token received in middleware:", token); // Add logging for debugging

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid Token", 401));
  }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
