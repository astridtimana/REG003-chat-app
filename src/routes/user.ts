import { Router } from "express";
import { createUser, getUser, getUsers, updateUser, deleteUser } from "../controller/user";

const router = Router();

router.post('/', createUser)

router.get('/', getUsers)

router.get('/:uid', getUser)

router.put('/:uid', updateUser)

router.delete('/:uid', deleteUser)

export default router;
