import { Router } from "express";
import { getAllUser,getUserBYId,createUser,updateUser,deleteUser } from "../controllers/userController.js";
import {verifyToken} from "../middlewares/middleware.js"

const router = Router();
router.use(verifyToken);
router.get('/' , getAllUser);
router.get('/:id' , getUserBYId);
router.post('/' , createUser);
router.put('/:id' , updateUser);
router.delete('/:id',deleteUser);
export default router;