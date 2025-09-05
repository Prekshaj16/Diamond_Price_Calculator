import mongoose from "mongoose";

const diamondSchema = new mongoose.Schema({
  shape: String,
  low_size: Number,
  high_size: Number,
  color: String,
  clarity: String,
  caratPrice: Number
});

const Diamond = mongoose.model("Diamond", diamondSchema);
export default Diamond;
