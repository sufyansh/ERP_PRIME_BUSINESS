const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: String,
    regionId: { type: mongoose.Schema.Types.ObjectId, ref: "CountryRegion" },
    isBlocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Country", CountrySchema);
