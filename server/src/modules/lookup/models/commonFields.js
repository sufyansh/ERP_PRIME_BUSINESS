const mongoose = require("mongoose");

const commonFields = {
  code: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  isBlocked: { type: Boolean, default: false }
};

const schemaOptions = {
  timestamps: true
};

module.exports = { commonFields, schemaOptions };
