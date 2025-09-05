import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Diamond from "../models/Diamond.js";

dotenv.config();

// get current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// read JSON file
const rawData = fs.readFileSync(path.join(__dirname, "diamonds.json"), "utf-8");
let diamonds = JSON.parse(rawData);

// 🔄 Transform JSON fields before inserting
diamonds = diamonds.map(d => ({
  shape: d.shape,
  low_size: Number(d.low_size),
  high_size: Number(d.high_size),
  color: d.color,
  clarity: d.clarity,
  caratPrice: Number(d.caratprice), // 👈 convert to number & rename
  date: d.date || null
}));

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // remove old data to prevent duplicates
    await Diamond.deleteMany();

    // insert transformed data
    await Diamond.insertMany(diamonds);
    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

importData();
