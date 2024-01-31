import express from "express";
import cors from "cors";
import pg from "pg";
import "dotenv/config";

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

// Postgres Pool Setup
const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Handle Requests
// GET request to retrieve products from products table
app.get("/api/products", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM products");
    const products = data.rows;
    res.send({ products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// POST request to insert each order into orders table
app.post("/api/order", async (req, res) => {
  let order_id = 1;
  const orders = req.body.order;
  const order_date = new Date().toISOString().slice(0, 10);
  try {
    // Check what is the last order_id in orders table and increment previous value by 1
    const result = await pool.query(
      "SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1"
    );
    const lastOrderIndex = result.rows;
    if (lastOrderIndex.length) {
      order_id = lastOrderIndex[0].order_id + 1;
    }
    // Loop through all order and insert into orders table
    orders.forEach(async (order) => {
      await pool.query(
        "INSERT INTO orders(order_id, product_id, qty, order_date) VALUES ($1, $2, $3, $4)",
        [order_id, order.id, order.qty, order_date]
      );
    });
    return res.send({ message: "Order added into database." });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//Start the Express Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// For unit test
// module.exports = app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });