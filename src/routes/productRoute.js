import { getProduct, addProductCart } from "../controllers/productController.js"
import { Router } from "express";

const router = Router();

router.get('/product', getProduct);
router.post('/addtocart', addProductCart);

export default router;