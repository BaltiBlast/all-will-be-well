const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "L'email est requis"],
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Format de l'email invalide"],
    },
    first_name: { type: String, required: [true, "Votre prénom est requis"], trim: true },
    message: { type: String, required: [true, "Le message est requis"] },
    date_to_send: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
  },
  { collection: "messages", timestamps: true }
);

module.exports = messageSchema;
