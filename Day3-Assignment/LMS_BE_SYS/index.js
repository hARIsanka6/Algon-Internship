const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Loads variables from .env

const { userRouter } = require("./routes/user");
const { adminRoutes } = require("./routes/admin");
const { courseRoutes } = require("./routes/course");

const app = express();


app.use(cors());
app.use(express.json()); 


const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/online-learning-app";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });


app.use("/user", userRouter);
app.use("/admin", adminRoutes);
app.use("/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Online Learning App API 📚");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
