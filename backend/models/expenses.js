const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Expenses = mongoose.model("Expenses", expenseSchema);
module.exports = Expenses;


/*

*/