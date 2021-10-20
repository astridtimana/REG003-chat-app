import { Router } from "express";
import { getCurrentUser } from "../controller/getCurrentUser";
import { validateToken } from "../middlewares/auth";


const router = Router();

router.get('/', validateToken, getCurrentUser)

export default router;


