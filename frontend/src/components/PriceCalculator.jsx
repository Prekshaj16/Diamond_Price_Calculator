import { useState } from "react";
import "../styles/calculator.css";
 // Import CSS file

function PriceCalculator({ history, setHistory }) {
  const [shape, setShape] = useState("Round");
  const [color, setColor] = useState("D");
  const [clarity, setClarity] = useState("IF");
  const [caratWeight, setCaratWeight] = useState("");
  const [discount, setDiscount] = useState(0);
  const [result, setResult] = useState(null);

  const colors = ["D", "E", "F", "G", "H", "I", "M"];
  const clarities = ["IF", "VVS1", "VVS2", "VS1", "SS2", "SI1", "SI2", "SI3", "I1", "I2", "I3"];
  const shapes = ["Round", "Pear", "Oval", "Cushion"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/diamonds/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shape, color, clarity, caratWeight, discount }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data);
        const record = { shape, color, clarity, discount, caratWeight, finalAmount: data.finalAmount };
        setHistory([...history, record]);
      } else {
        alert(data.message || "Error calculating price");
      }
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className="calculator-card">
      <h2>CALCULATOR</h2>
      <form onSubmit={handleSubmit}>
        {/* Shape */}
        <label>Shape</label>
        <select value={shape} onChange={(e) => setShape(e.target.value)}>
          {shapes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Color */}
        <label>Color</label>
        <div className="options-row">
          {colors.map((c) => (
            <button
              type="button"
              key={c}
              className={`option-btn ${color === c ? "active" : ""}`}
              onClick={() => setColor(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Clarity */}
        <label>Clarity</label>
        <div className="options-row">
          {clarities.map((cl) => (
            <button
              type="button"
              key={cl}
              className={`option-btn ${clarity === cl ? "active" : ""}`}
              onClick={() => setClarity(cl)}
            >
              {cl}
            </button>
          ))}
        </div>

        {/* Discount */}
        <label>Discount %</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        {/* Carat Weight */}
        <label>Carat Weight</label>
        <input
          type="number"
          value={caratWeight}
          onChange={(e) => setCaratWeight(e.target.value)}
          required
        />

        {/* Calculate */}
        <button type="submit" className="calculate-btn">CALCULATE</button>
      </form>

      {result && (
        <div className="result-box">
          <p><b>Base Price:</b> {result.basePrice}</p>
          <p><b>New Price Per Carat:</b> {result.newPricePerCarat}</p>
          <p><b>Final Amount:</b> {result.finalAmount}</p>
        </div>
      )}
    </div>
  );
}

export default PriceCalculator;
