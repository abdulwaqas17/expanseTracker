const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const addIncome = require("../controllers/addIncome");
const deleteIncome = require("../controllers/delIncome");
const router = express.Router();

// Protected route
router.post("/add-income/:id", verifyToken, addIncome);

router.delete("/del-income/:incomeID", verifyToken, deleteIncome);

module.exports = router;
