const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema(
  {
    originalURL: {
      type: String,
      unique: true,
      required: true,
    },
    generatedURL: {
      type: String,
      unique: true,
    },
    shortID: {
      type: String,
      unique: true,
      required: true,
    },
    visitHistory: [
      {
        timestamps: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const URL = mongoose.model("URL", URLSchema);

module.exports = URL;
