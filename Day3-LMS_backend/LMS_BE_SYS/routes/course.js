const express = require("express");
const mongoose = require("mongoose");
const { courseModel } = require("../db");

const courseRoutes = express.Router();

// 🎯 1. GET /courses — Fetch all courses
courseRoutes.get("/", async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.status(200).json({ courses });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses", error: err.message });
  }
});

// 🎯 2. GET /courses/:id — Fetch a single course by ID
courseRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (err) {
    res.status(500).json({ message: "Error fetching the course", error: err.message });
  }
});

module.exports = {
  courseRoutes
};
