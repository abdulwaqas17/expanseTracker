const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const addExpense = require("../controllers/addExpense");
const router = express.Router();

// Protected route
router.post("/add-expense/:id", verifyToken, addExpense);

module.exports = router;
