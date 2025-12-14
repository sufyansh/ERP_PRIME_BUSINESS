const mongoose = require("mongoose");
const { commonFields, schemaOptions } = require("../commonFields");

const ProductTypeSchema = new mongoose.Schema(
  { ...commonFields },
  schemaOptions
);

module.exports = mongoose.model("ProductType", ProductTypeSchema);
