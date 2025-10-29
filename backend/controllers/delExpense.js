const Expense = require("../models/expenses");
const User = require("../models/users");

// Delete Expense Controller
const deleteExpense = async (req, res) => {
  try {
    const { expenseID } = req.params;
    const userId = req.user.id; // from verifyToken middleware

    // ✅ Find expense
    const expense = await Expense.findById(expenseID);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // ✅ Delete expense
    await Expense.findByIdAndDelete(expenseID);

    // ✅ Remove expenseID from user's expenses array
    const user = await User.findById(userId);
    if (user) {
      user.expenses = user.expenses.filter(
        (expId) => expId.toString() !== expenseID
      );
      await user.save();
    }

    //  Populate user with latest incomes
    const updatedUser = await User.findById(userId).populate("expenses");

    res
      .status(200)
      .json({ message: "Expense deleted successfully", user: updatedUser });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteExpense;
