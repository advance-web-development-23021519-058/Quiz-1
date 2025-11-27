// ===============================
// IMPORTS
// ===============================
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

// Sensible defaults so the app runs without a .env file
if (!process.env.MONGO_URI) process.env.MONGO_URI = 'mongodb://127.0.0.1:27017';
if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'super_secret_quiz_key';
if (!process.env.PORT) process.env.PORT = '5000';

// ===============================
// APP CONFIG
// ===============================
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ===============================
// DATABASE CONNECTION
// ===============================
let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db("quizdb"); // database name
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  }
};

// ===============================
// TOKEN VERIFICATION MIDDLEWARE
// ===============================
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: new ObjectId(decoded.id) };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ===============================
// ROUTES
// ===============================

// ✅ Registration Route
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Server-side validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: "Name must be at least 3 characters" });
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  try {
    const userExists = await db.collection("users").findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertResult = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    if (!insertResult.insertedId) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// ✅ Login Route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // Server-side validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Incorrect email and password combination" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect email and password combination" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Data for dashboard
    const dashboardData = {
      lastLogin: new Date().toISOString(),
      activeTasks: 3,
      subscriptionStatus: "Active",
    };

    res.status(200).json({
      message: "Login successful!",
      token,
      user: { name: user.name, email: user.email, _id: user._id },
      dashboard: dashboardData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// ✅ Dashboard Route (Protected)
app.get("/api/auth/dashboard", protect, async (req, res) => {
  try {
    const user = await db
      .collection("users")
      .findOne({ _id: req.user.id }, { projection: { password: 0 } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Welcome to your dashboard!",
      data: user,
      lastLogin: new Date().toISOString(),
      activeTasks: 3,
      subscriptionStatus: "Active",
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server error fetching dashboard data" });
  }
});

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});


