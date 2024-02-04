import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import errorHandler from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const userData = async (req, res, next) => {
  try {
    const userID = req.id.toString();

    const user = await User.findById(userID).select("-password");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userID = req.id.toString();
    const updatedData = req.body;

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    } else {
      delete updatedData.password;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      { $set: updatedData },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  if (req.id.toString() === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(400, "You can only view your listing"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, "user not found"));
    }

    const { password, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
