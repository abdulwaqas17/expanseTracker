const Income = require("../models/incomes");
const User = require("../models/users");

// ✅ Edit Income Controller
const editIncome = async (req, res) => {
try {
const { incomeID } = req.params;
const { icon, source, amount, date } = req.body;
const userId = req.user.id; // from verifyToken middleware

// 🧩 Validation
if (!icon || !source || !amount || !date) {
  return res.status(400).json({ message: "All fields are required" });
}

// 🔍 Find income by ID
const income = await Income.findById(incomeID);
if (!income) {
  return res.status(404).json({ message: "Income not found" });
}

// 📝 Update income fields
income.icon = icon;
income.source = source;
income.amount = amount;
income.date = date;

await income.save();

// 🔁 Find and populate updated user
const updatedUser = await User.findById(userId).populate("incomes");

res.status(200).json({
  message: "Income updated successfully",
  user: updatedUser,
});


} catch (error) {
console.error("Error updating income:", error);
res.status(500).json({ message: "Internal server error" });
}
};

module.exports = editIncome;