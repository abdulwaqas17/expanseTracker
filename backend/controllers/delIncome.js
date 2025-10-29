const Income = require("../models/incomes");
const User = require("../models/users");

// Delete Income Controller
const deleteIncome = async (req, res) => {
  try {
    const { incomeID } = req.params;
    const userId = req.user.id; // from verifyToken

    // Find income
    const income = await Income.findById(incomeID);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    // Delete income
    await Income.findByIdAndDelete(incomeID);

    // Remove incomeID from user's incomes array
    const user = await User.findById(userId);
    if (user) {
      user.incomes = user.incomes.filter(
        (incId) => incId.toString() !== incomeID
      );
      await user.save();
    }

    //  Populate user with latest incomes
    const updatedUser = await User.findById(userId).populate("incomes");

    res
      .status(200)
      .json({ message: "Income deleted successfully", user: updatedUser });
  } catch (error) {
    console.error("Error deleting income:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteIncome;
