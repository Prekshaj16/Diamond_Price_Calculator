import express from "express";
import Diamond from "../models/diamondModel.js";

const router = express.Router();

// 👉 Fetch all diamonds with filters + sorting
router.get("/", async (req, res) => {
  try {
    const { shape, color, clarity, sortBy, order } = req.query;
    let filter = {};

    // ✅ Case-insensitive filters
    if (shape) filter.shape = new RegExp("^" + shape + "$", "i");
    if (color) filter.color = new RegExp("^" + color + "$", "i");
    if (clarity) filter.clarity = new RegExp("^" + clarity + "$", "i");

    let query = Diamond.find(filter);

    // ✅ Sorting
    if (sortBy) {
      query = query.sort({ [sortBy]: order === "desc" ? -1 : 1 });
    }

    const diamonds = await query.exec();
    res.json(diamonds);
  } catch (error) {
    console.error("❌ Error fetching diamonds:", error);
    res.status(500).json({ message: error.message });
  }
});

// 👉 Price Calculator endpoint
router.post("/calculate", async (req, res) => {
  try {
    let { shape, color, clarity, discount = 0, caratWeight } = req.body;

    if (!shape || !color || !clarity || !caratWeight) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    caratWeight = Number(caratWeight);
    discount = Number(discount);

    // 🔍 Find matching diamond with case-insensitive search
    const diamond = await Diamond.findOne({
      shape: new RegExp("^" + shape + "$", "i"),
      color: new RegExp("^" + color + "$", "i"),
      clarity: new RegExp("^" + clarity + "$", "i"),
      low_size: { $lte: caratWeight },
      high_size: { $gte: caratWeight }
    });

    if (!diamond) {
      return res.status(404).json({ message: "Price Not Available" });
    }

    const basePrice = Number(diamond.caratPrice);
    const newPricePerCarat = basePrice - (basePrice * (discount / 100));
    const finalAmount = newPricePerCarat * caratWeight;

    res.json({
      basePrice,
      newPricePerCarat: newPricePerCarat.toFixed(2),
      finalAmount: finalAmount.toFixed(2)
    });

  } catch (error) {
    console.error("❌ Error in /calculate:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
