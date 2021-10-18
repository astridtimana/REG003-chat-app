import { Router } from "express";
import { createUser, getUser, getUsers, updateUser, deleteUser } from "../controller/user";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";


const router = Router();

router.post('/', [
    check("email", "No es un email válido").isEmail(),
    check("name", "Ingrese un nombre").not().isEmpty(),
    check("password", "Ingrese una contraseña").not().isEmpty(),
    validateFields
] ,createUser)

router.get('/', getUsers)

router.get('/:uid', getUser)

router.put('/:uid', updateUser)

router.delete('/:uid', deleteUser)


export default router;
