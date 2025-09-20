import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productsRoutes from "./routes/product.route.js";
import path from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

const __dirname = path.resolve(); // start from project root

app.use(express.json()); // to parse JSON data of body

app.use("/api/products", productsRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
