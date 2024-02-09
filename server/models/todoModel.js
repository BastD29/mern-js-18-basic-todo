const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    id: { type: String, required: false },
    text: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    // createdAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
