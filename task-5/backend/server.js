import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task 5 REST API is running"
  });
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});