import { Router } from "express";

import { getAllProduk,getOneData,createProduk,updateData,deleteProduct } from "../controllers/productController.js";


const router = Router();
router.get('/',getAllProduk);
router.get('/:id',getOneData);
router.post('/', createProduk);
router.put('/:id', updateData);
router.delete('/:id', deleteProduct);
export default router;