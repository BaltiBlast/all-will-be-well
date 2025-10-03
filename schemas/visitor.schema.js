const mongoose = require("mongoose");
const { Schema } = mongoose;

const visitorCounterSchema = new Schema(
  {
    _id: { type: String, default: "singleton" },
    landingVisitCount: { type: Number, default: 0, required: true },
  },
  { timestamps: false }
);

module.exports = visitorCounterSchema;
