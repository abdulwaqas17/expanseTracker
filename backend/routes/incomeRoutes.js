const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const addIncome = require("../controllers/addIncome");
const deleteIncome = require("../controllers/delIncome");
const editIncome = require("../controllers/editIncome");
const router = express.Router();

// Protected route
router.post("/add-income", verifyToken, addIncome);

router.delete("/del-income/:incomeID", verifyToken, deleteIncome);

// Edit Income
router.put("/edit-income/:incomeID", verifyToken, editIncome);

module.exports = router;
