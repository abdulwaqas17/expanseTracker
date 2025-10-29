const Expense = require("../models/expenses");
const User = require("../models/users");

// Add Expense Controller
const addExpense = async (req, res) => {
  try {
    const { id } = req.user;
    const { icon, category, amount,date } = req.body;

    //  Basic validation
    if (!icon || !category || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  Emoji allowed: (string me emoji bhi valid hai)
    if (typeof icon !== "string" || icon.length < 1) {
      return res.status(400).json({ message: "Icon must be a valid emoji" });
    }

    // Find user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create expense
    const newExpense = new Expense({
      icon,
      category,
      amount,
      date
    });

    const savedExpense = await newExpense.save();

    // Push expense id into user's expense array
    user.expenses.push(savedExpense._id);
    await user.save();

    //  Populate user with latest expenses
    const updatedUser = await User.findById(id).populate("expenses");

    res.status(201).json({
      message: "Expense added successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addExpense;
