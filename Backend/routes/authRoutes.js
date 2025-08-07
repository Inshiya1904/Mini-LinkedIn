

const express = require("express");


const authMiddleware = require("../middlewares/authMiddleware");
const {  getProfile, updateProfile, register, login } = require("../controllers/authController");
const upload = require("../middlewares/upload");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get Profile
router.get("/profile", authMiddleware, getProfile);

// Update Profile
router.put("/profile", authMiddleware, upload.single('profileImage'), updateProfile);

module.exports = router;