const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const getUserById = require("../controllers/getUser");

// GET USER
router.get("/get-user/:id", verifyToken, getUserById);

module.exports = router;
