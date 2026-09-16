import { getAllProducts } from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
};