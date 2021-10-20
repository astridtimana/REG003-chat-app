import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

router.post('/', validateToken, (req, res, next) => {
  
  res.json({
    msg: 'ok'
  })
})

export default router;

