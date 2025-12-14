const mongoose = require("mongoose");

const HSCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    description: String,
    fbrApiResponse: Object,
    uniqueCode: String,
    isBlocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("HSCode", HSCodeSchema);
