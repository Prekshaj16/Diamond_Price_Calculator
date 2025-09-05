import mongoose from "mongoose";

const diamondSchema = new mongoose.Schema({
  shape: { type: String, required: true },
  low_size: { type: Number, required: true },
  high_size: { type: Number, required: true },
  color: { type: String, required: true },
  clarity: { type: String, required: true },
  caratPrice: { type: Number, required: true }
}, { timestamps: true });

const Diamond = mongoose.model("Diamond", diamondSchema);

export default Diamond;
