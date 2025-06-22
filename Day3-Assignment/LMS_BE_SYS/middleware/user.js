const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Course, Purchase } = require("../db");
const { userMiddleware } = require("../middleware/userMiddleware");
const { JWT_USER_PASSWORD } = require("../config");

const userRouter = express.Router();

// POST /user/signup
userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const newUser = new User({ email, password, firstName, lastName });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// POST /user/signin
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ Id: user._id }, JWT_USER_PASSWORD, { expiresIn: "1d" });
    res.json({ message: "Signin successful", token });
  } catch (err) {
    res.status(500).json({ message: "Signin failed", error: err.message });
  }
});

// POST /user/purchase (protected)
userRouter.post("/purchase", userMiddleware, async (req, res) => {
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ message: "Course ID required" });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyPurchased = await Purchase.findOne({
      userId: req.userId,
      courseId: courseId,
    });

    if (alreadyPurchased) {
      return res.status(409).json({ message: "Course already purchased" });
    }

    const newPurchase = new Purchase({
      userId: req.userId,
      courseId: courseId,
    });

    await newPurchase.save();
    res.json({ message: "Course purchased successfully" });
  } catch (err) {
    res.status(500).json({ message: "Purchase failed", error: err.message });
  }
});

// GET /user/purchases (protected)
userRouter.get("/purchases", userMiddleware, async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.userId });

    const courseIds = purchases.map(p => p.courseId);
    const courses = await Course.find({ _id: { $in: courseIds } });

    res.json({ purchasedCourses: courses });
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve purchases", error: err.message });
  }
});

module.exports = userRouter;
