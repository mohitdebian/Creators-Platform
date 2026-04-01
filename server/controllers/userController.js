import User from "../models/User.js";
import bcrypt from "bcrypt";

// ✅ REGISTER USER
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      const err = new Error("All fields are required");
      err.status = 400;
      return next(err);
    }

    // Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      const err = new Error("Email already exists");
      err.status = 400;
      return next(err);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ GET ALL USERS
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// ✅ GET USER BY ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE USER
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ✅ DELETE USER
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
