import { addOrder, getOrders } from "../controllers/userOrdersController.js"
import { Router } from "express";

const router = Router();

router.post('/myorders', addOrder);
router.get('/myorders', getOrders);

export default router;