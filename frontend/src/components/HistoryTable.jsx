function HistoryTable({ history, setHistory }) {
  const clearHistory = () => setHistory([]);

  return (
    <div>
      <h2>Search History</h2>
      {history.length === 0 ? (
        <p>No searches yet.</p>
      ) : (
        <div>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Shape</th>
                <th>Color</th>
                <th>Clarity</th>
                <th>Carat</th>
                <th>Discount %</th>
                <th>Final Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, index) => (
                <tr key={index}>
                  <td>{h.shape}</td>
                  <td>{h.color}</td>
                  <td>{h.clarity}</td>
                  <td>{h.caratWeight}</td>
                  <td>{h.discount}</td>
                  <td>{h.finalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={clearHistory} style={{ marginTop: "10px" }}>
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}

export default HistoryTable;
