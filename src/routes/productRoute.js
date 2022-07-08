import { getProduct } from "../controllers/productController.js"
import { Router } from "express";

const router = Router();

router.get('/product', getProduct);

export default router;