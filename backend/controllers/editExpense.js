const Expense = require("../models/expenses");
const User = require("../models/users");

// ✅ Edit Expense Controller
const editExpense = async (req, res) => {
try {
const { expenseID } = req.params;
const { icon, title, amount, date, category } = req.body;

// 🔍 Validation: Check all fields exist
if (!icon || !amount || !date || !category) {
  return res.status(400).json({ message: "All fields are required!" });
}

// 🔍 Find expense by ID
const expense = await Expense.findById(expenseID);
if (!expense) {
  return res.status(404).json({ message: "Expense not found!" });
}

// 🛠 Update fields
expense.icon = icon;
expense.amount = amount;
expense.date = date;
expense.category = category;

await expense.save();

// 🔑 Find the logged-in user & populate expenses
const user = await User.findById(req.user.id).populate("expenses").populate("incomes");

return res.status(200).json({
  message: "Expense updated successfully!",
  user,
});


} catch (error) {
console.error("Error updating expense:", error);
res.status(500).json({ message: "Internal server error" });
}
};

module.exports = editExpense;