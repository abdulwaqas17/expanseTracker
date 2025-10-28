const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const addIncome = require("../controllers/addIncome");
const router = express.Router();

// Protected route
router.post("/add-income/:id", verifyToken, addIncome);

module.exports = router;
