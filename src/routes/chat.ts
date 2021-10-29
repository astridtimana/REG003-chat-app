import { Router } from "express";
import { getMessages, sendMessages } from "../controller/chat";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

router.post('/', validateToken, sendMessages)

router.get('/', validateToken, getMessages)

export default router;

