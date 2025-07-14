import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema({
  url: String,
  originalText: String,
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Summary ||
  mongoose.model("Summary", SummarySchema);
