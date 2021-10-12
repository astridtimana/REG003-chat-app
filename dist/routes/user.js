"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)("email", "No es un email válido").isEmail(),
    (0, express_validator_1.check)("name", "Ingrese un nombre").not().isEmpty(),
    (0, express_validator_1.check)("password", "Ingrese una contraseña").not().isEmpty()
], user_1.createUser);
router.get('/', user_1.getUsers);
router.get('/:uid', user_1.getUser);
router.put('/:uid', user_1.updateUser);
router.delete('/:uid', user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map