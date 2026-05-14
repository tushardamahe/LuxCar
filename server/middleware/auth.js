import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.userId) {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }

    req.user = await User.findById(decoded.userId).select("-password");

    next();
  } catch (error) {
    console.log(error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboaradData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (!role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const cars = await Car.find({ owner: _id });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
