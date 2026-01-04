import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Admin Login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if admin exists
    const admin = await userModel.findOne({ email });

    if (!admin) {
      return res.json({ success: false, message: "Admin does not exist" });
    }

    // check role
    if (admin.role !== "admin") {
      return res.json({ success: false, message: "Not an admin account" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
    );

    res.json({ success: true, token, role: "admin" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
