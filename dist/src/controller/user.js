"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
// import HttpException from "../helpers/httpException";
const client_1 = __importDefault(require("../db/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../helpers/generateToken");
const createUser = (req, res /* , next: NextFunction */) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield client_1.default.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (existingUser) {
            return res.status(400).json({
                error: 'El usuario ya existe en la base de datos'
            });
            /* next(new HttpException(400, 'Bad request')) */
        }
        const salt = bcryptjs_1.default.genSaltSync();
        const hashedPassword = bcryptjs_1.default.hashSync(req.body.password, salt);
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };
        const user = yield client_1.default.user.create({ data: newUser });
        const token = yield (0, generateToken_1.generateToken)(user.id);
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token
        });
    }
    catch (error) {
        res.status(error.status).json(error.message);
        /* next(new HttpException(error.status, error.message)) */
    }
});
exports.createUser = createUser;
const getUsers = (req, res /* , next: NextFunction */) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield client_1.default.user.findMany();
        res.json(allUsers);
        // Cómo podemos hacer para que aquí no se muestre la contraseña? Tal vez en el modelo idk
    }
    catch (error) {
        res.status(error.status).json(error.message);
        /* next(new HttpException(error.status, error.message)) */
    }
});
exports.getUsers = getUsers;
const getUser = (req, res /* , next: NextFunction */) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // By ID
        const findUserId = yield client_1.default.user.findUnique({
            where: {
                id: parseInt(req.params.uid),
            },
        });
        // console.log(findUserId)
        if (!findUserId) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }
        res.json({
            id: findUserId.id,
            name: findUserId.name,
            email: findUserId.email,
        });
    }
    catch (error) {
        res.status(error.status).json(error.message);
        /* next(new HttpException(error.status, error.message)) */
    }
});
exports.getUser = getUser;
const updateUser = (req, res /* , next: NextFunction */) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, email, password } = req.body;
        const findUserToUpd = yield client_1.default.user.findUnique({
            where: {
                id: Number(req.params.uid),
            }
        });
        if (!findUserToUpd)
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        if (password) {
            const salt = bcryptjs_1.default.genSaltSync();
            password = bcryptjs_1.default.hashSync(password, salt);
        }
        const updatedUser = yield client_1.default.user.update({
            where: {
                id: Number(req.params.uid),
            },
            data: { email, name, password }
        });
        return res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email
        });
    }
    catch (error) {
        res.status(error.status).json(error.message);
        /* next(new HttpException(error.status, error.message)) */
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res /* , next: NextFunction */) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield client_1.default.user.delete({
            where: {
                id: Number(req.params.uid),
            },
        });
        return res.json({
            id: deletedUser.id,
            name: deletedUser.name,
            email: deletedUser.email
        });
    }
    catch (error) {
        res.status(error.status).json(error.message);
        /* next(new HttpException(error.status, error.message)) */
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map