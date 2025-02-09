import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.jwt; // Check if cookie exists

  if (!token) {
    res.status(401).json({ message: "Not authorized, token missing." });
    return; // Exit early if no token
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request object (excluding password)
    req.user = await User.findById(decoded.userId).select("-password");

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed." });
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    next(); // User is admin, proceed
  } else {
    res.status(403).json({ message: "Not authorized as an admin." });
  }
};

export { authenticate, authorizeAdmin };
