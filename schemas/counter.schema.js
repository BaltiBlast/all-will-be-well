const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageCounterSchema = new Schema(
  {
    _id: { type: String, default: "singleton" },
    sentMessageCount: { type: Number, default: 0, required: true },
  },
  { timestamps: false }
);

module.exports = messageCounterSchema;
