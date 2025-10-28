const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },

    // Relationships
    incomes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Incomes",
      },
    ],
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expenses",
      },
    ],
  },
  { timestamps: true }
);

const Users = mongoose.model("User", userSchema);
module.exports = Users
