import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../data/products.json");

const readProducts = async () => {
  const data = await fs.readFile(dataPath, "utf-8");

  return JSON.parse(data);
};

// GET ALL
export const getAllProducts = async () => {
  return await readProducts();
};