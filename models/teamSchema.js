import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  members: [{ type: String, required: true }],
  domain: { type: String, required: true },
  available: { type: String, required: true },
});

export default mongoose.model("teams", teamSchema);
