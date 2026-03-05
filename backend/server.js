require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

/* -------------------- Rate Limiter -------------------- */

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

/* -------------------- Dummy User -------------------- */
/* password = admin */

const user = {
  username: "admin",
  passwordHash: bcrypt.hashSync("admin", 10)
};

/* -------------------- LOGIN API -------------------- */

app.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Login successful" });
});

/* -------------------- Serve React -------------------- */

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

/* -------------------- Start Server -------------------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});