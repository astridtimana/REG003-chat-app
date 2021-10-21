import { Router } from "express";
import { login } from "../controller/auth";
import pkg from '../../package.json'

const router = Router();

router.post('/',login)

router.get('/',(req, res) => res.json({ name: pkg.name, version: pkg.version }) )

export default router;


