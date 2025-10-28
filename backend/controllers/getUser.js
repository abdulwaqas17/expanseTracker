const Users = require("../models/users");

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Users.findById(userId)
    //   .populate("incomes")
    //   .populate("expenses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getUserById;
