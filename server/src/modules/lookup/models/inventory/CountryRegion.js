const mongoose = require("mongoose");
const { commonFields, schemaOptions } = require("../commonFields");

module.exports = mongoose.model(
  "CountryRegion",
  new mongoose.Schema({ ...commonFields }, schemaOptions)
);
