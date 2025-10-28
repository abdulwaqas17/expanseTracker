const Income = require("../models/incomes");
const User = require("../models/users");

// Add Expense Controller
const addIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { icon, source, amount,date } = req.body;

    //  Basic validation
    if (!icon || !source || !amount) {
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
    const newIncome = new Income({
      icon,
      source,
      amount,
      date
    });

    const savedIncome = await newIncome.save();

    // Push expense id into user's expense array
    user.incomes.push(savedIncome._id);
    await user.save();

    //  Populate user with latest incomes
    const updatedUser = await User.findById(id).populate("incomes");

    res.status(201).json({
      message: "income added successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addIncome;
