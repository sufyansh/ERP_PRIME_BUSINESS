const mongoose = require("mongoose");

const AccountNatureSchema = new mongoose.Schema({
  code: String,
  name: String,
  financialStatement: {
    type: String,
    enum: ["IncomeStatement", "BalanceSheet"]
  }
});

module.exports = mongoose.model("AccountNature", AccountNatureSchema);
