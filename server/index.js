const express = require("express");
const cors=require("cors");

const app = express();
const PORT = 8000;

const stocks = [
  { symbol: "AAPL", price: 150 },
  { symbol: "GOOGL", price: 2700 },
  { symbol: "MSFT", price: 300 },
  { symbol: "AMZN", price: 3500 },
];

app.use(cors())

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const intervalId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * stocks.length);
    const randomStock = stocks[randomIndex];
    randomStock.price += Math.floor(Math.random() * 20) - 10;
    res.write(`data: ${JSON.stringify(randomStock)}\n\n`);
  }, 1000);

  // When the client closes the connection, stop sending events
  req.on("close", () => {
    console.log("closed")
    clearInterval(intervalId);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
