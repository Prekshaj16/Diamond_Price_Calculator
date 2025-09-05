import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/table.css";

const DiamondTable = () => {
  const [diamonds, setDiamonds] = useState([]);
  const [shape, setShape] = useState("");
  const [color, setColor] = useState("");
  const [clarity, setClarity] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

  const fetchDiamonds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/diamonds", {
        params: { shape, color, clarity, sortBy, order },
      });
      console.log("✅ API Data:", res.data); // 👉 Debug log
      setDiamonds(res.data);
    } catch (err) {
      console.error("❌ Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchDiamonds();
  }, [shape, color, clarity, sortBy, order]);

  return (
    <div className="table-container">
      <h2>Diamond List</h2>

      {/* Filters */}
      <div className="filters">
        <select value={shape} onChange={(e) => setShape(e.target.value)}>
          <option value="">All Shapes</option>
          <option value="Round">Round</option>
          <option value="Pear">Pear</option>
        </select>

        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">All Colors</option>
          {["D","E","F","G","H","I","J","K","L","M","N"].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={clarity} onChange={(e) => setClarity(e.target.value)}>
          <option value="">All Clarity</option>
          {["IF","VVS1","VVS2","VS1","VS2","SI1","SI2","SI3","I1","I2","I3"].map(cl => (
            <option key={cl} value={cl}>{cl}</option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">No Sorting</option>
          <option value="caratPrice">Carat Price</option>
          <option value="low_size">Carat Min</option>
          <option value="high_size">Carat Max</option>
        </select>

        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Table */}
      <table className="diamond-table">
        <thead>
          <tr>
            <th>Shape</th>
            <th>Color</th>
            <th>Clarity</th>
            <th>Low Size</th>
            <th>High Size</th>
            <th>Carat Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {diamonds.length > 0 ? (
            diamonds.map((d, index) => (
              <tr key={index}>
                <td>{d.shape}</td>
                <td>{d.color}</td>
                <td>{d.clarity}</td>
                <td>{d.low_size}</td>
                <td>{d.high_size}</td>
                <td>{d.caratPrice}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No diamonds found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DiamondTable;
