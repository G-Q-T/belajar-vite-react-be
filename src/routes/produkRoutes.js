import { Router } from "express";

import { getAllProduk,getOneData } from "../controllers/productController.js";


const router = Router();
router.get('/',getAllProduk);
router.get('/:id',getOneData);
export default router;