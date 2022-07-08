import { getProduct, getProductDetails } from "../controllers/productController.js"
import { Router } from "express";

const router = Router();

router.get('/product', getProduct);
router.get('/productDetails', getProductDetails);

export default router;