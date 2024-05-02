import React, { useState, useEffect } from "react";
import "./App.css"

function App() {
  const [stockData, setStockData] = useState<any>([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStockData((prevStockData:any) => [...prevStockData, data]);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const getStockColor = (price:number) => {
    if (price < 200) {
      return "red";
    } else if (price > 3000) {
      return "green";
    } else {
      return "black";
    }
  };

  return (
    <div className="container">
    <h1>Real-time Stock Prices</h1>
    <table className="stock-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
      {stockData.map((stock:any, index:number) => (
            <tr key={index}>
              <td>{stock.symbol}</td>
              <td style={{ color: getStockColor(stock.price) }}>
                ${stock.price}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  );
}

export default App;
