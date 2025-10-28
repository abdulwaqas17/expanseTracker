const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Incomes = mongoose.model("Incomes", incomeSchema);
module.exports = Incomes;
