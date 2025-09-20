import express from "express";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.post("/", addProduct);
router.get("/", getAllProducts);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
export default router;


