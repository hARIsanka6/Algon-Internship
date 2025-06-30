const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../db");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

const adminRoutes = Router();

// 🟢 Public: Admin Signup
adminRoutes.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const existing = await adminModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    await adminModel.create({ email, password, firstName, lastName });

    res.status(201).json({
      message: "Admin account created successfully"
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating admin", error: err.message });
  }
});

// 🟢 Public: Admin Signin
adminRoutes.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({ email, password });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ Id: admin._id }, JWT_ADMIN_PASSWORD, {
      expiresIn: "1d"
    });

    res.json({
      message: "Signin successful",
      token
    });
  } catch (err) {
    res.status(500).json({ message: "Signin failed", error: err.message });
  }
});

// 🔒 Protected routes start here
adminRoutes.use(adminMiddleware);

// 🔐 Create Course (Protected)
adminRoutes.post("/courses", async (req, res) => {
  const { title, description, price, imageUrl } = req.body;

  if (!title || !description || !price || !imageUrl) {
    return res.status(400).json({ message: "All course fields are required" });
  }

  try {
    const course = await courseModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId: req.adminId
    });

    res.status(201).json({
      message: "Course created successfully",
      course
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create course", error: err.message });
  }
});

// 🔐 Get All Courses Created by Admin (Protected)
adminRoutes.get("/courses", async (req, res) => {
  try {
    const courses = await courseModel.find({ creatorId: req.adminId });
    res.json({ createdCourses: courses });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses", error: err.message });
  }
});

module.exports = {
  adminRoutes
};
