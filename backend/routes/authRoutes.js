const express = require("express");
const upload = require("../middlewares/upload");
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/loginUser");
const router = express.Router();

// Register route with image upload
router.post("/register", upload.single("profileImage"), registerUser);

// Route for login user
router.post("/login",loginUser)

module.exports = router;
