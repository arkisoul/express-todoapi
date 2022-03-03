const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    isCompleted: { type: Boolean, required: true, default: false },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodosSchema);
