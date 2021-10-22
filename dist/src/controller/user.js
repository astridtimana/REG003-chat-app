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
const client_1 = __importDefault(require("../db/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../helpers/generateToken");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield client_1.default.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (existingUser) {
            return res.status(400).json({
                error: 'Email already exists'
            });
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
        res.cookie("token", token, { expires: new Date(Date.now() + 1800000), sameSite: "none" });
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email /* ,
            token */
        });
    }
    catch (error) {
        res.status(500).json('Internal server error');
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield client_1.default.user.findMany();
        res.status(200).json(allUsers);
        // Cómo podemos hacer para que aquí no se muestre la contraseña? Tal vez en el modelo idk
    }
    catch (error) {
        // No sabemos qué error podemos darle para testearlo
        res.status(500).json('Internal server error');
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const findUserId = yield client_1.default.user.findUnique({
            where: {
                id: Number(uid)
            }
        });
        return res.status(200).json({
            id: findUserId.id,
            name: findUserId.name,
            email: findUserId.email,
        });
    }
    catch (error) {
        return res.status(404).json({
            error: 'User not found'
        });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password } = req.body;
    const { uid } = req.params;
    try {
        if (!uid || (!name && !email && !password)) {
            return res.status(400).json({
                error: 'Bad request'
            });
        }
        if (password) {
            const salt = bcryptjs_1.default.genSaltSync();
            password = bcryptjs_1.default.hashSync(password, salt);
        }
        const updatedUser = yield client_1.default.user.update({
            where: {
                id: Number(uid),
            },
            data: { email, name, password }
        });
        return res.status(200).json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email
        });
    }
    catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        else {
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield client_1.default.user.delete({
            where: {
                id: Number(req.params.uid),
            },
        });
        return res.status(200).json({
            id: deletedUser.id,
            name: deletedUser.name,
            email: deletedUser.email
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map