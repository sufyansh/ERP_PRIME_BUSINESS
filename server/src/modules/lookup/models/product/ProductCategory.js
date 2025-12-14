const mongoose = require("mongoose");
const { commonFields, schemaOptions } = require("../commonFields");

const ProductCategorySchema = new mongoose.Schema(
  { ...commonFields },
  schemaOptions
);

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
