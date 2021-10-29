import { Router } from "express";
import { getMessages, getMessagesById, sendMessages } from "../controller/chat";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

router.post('/', validateToken, sendMessages)

router.get('/', validateToken, getMessages)

router.get('/:id', validateToken, getMessagesById)

export default router;

