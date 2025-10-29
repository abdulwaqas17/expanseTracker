const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const addExpense = require("../controllers/addExpense");
const deleteExpense = require("../controllers/delExpense");
const editExpense = require("../controllers/editExpense");
const router = express.Router();

// Protected route
router.post("/add-expense", verifyToken, addExpense);

router.delete("/del-expense/:expenseID", verifyToken, deleteExpense);

router.put("/edit-expense/:expenseID", verifyToken, editExpense);

module.exports = router;
