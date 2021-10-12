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
const httpException_1 = __importDefault(require("../helpers/httpException"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (existingUser) {
            return next(new httpException_1.default(400, 'Bad request'));
        }
        const salt = bcryptjs_1.default.genSaltSync();
        const hashedPassword = bcryptjs_1.default.hashSync(req.body.password, salt);
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };
        const user = yield prisma.user.create({ data: newUser });
        res.json({ email: user.email, name: user.name, id: user.id });
    }
    catch (error) {
        next(new httpException_1.default(error.status, error.message));
    }
});
exports.createUser = createUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.user.findMany();
        res.json(allUsers);
    }
    catch (error) {
        next(new httpException_1.default(error.status, error.message));
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        // By ID
        const findUserId = yield prisma.user.findUnique({
            where: {
                id: parseInt(req.params.uid),
            },
        });
        if (!findUserId) {
            return res.status(404).json('Usuario no encontrado');
        }
        // deberíamos hacer un findUser by email?
        // else /* if (!findUserId) */{
        //   // By unique identifier
        //   const findUserEmail = await prisma.user.findUnique({
        //     where: {
        //       email: req.params.uid,
        //     },
        //   })
        //   res.json(findUserEmail)
        // }
        res.json(findUserId);
    }
    catch (error) {
        next(new httpException_1.default(error.status, error.message));
    }
});
exports.getUser = getUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield prisma.user.update({
            where: {
                id: Number(req.params.uid),
            },
            data: {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            },
        });
        res.json(updatedUser);
    }
    catch (error) {
        next(new httpException_1.default(error.status, error.message));
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteUser = yield prisma.user.delete({
            where: {
                id: Number(req.params.uid),
            },
        });
        res.json(deleteUser);
    }
    catch (error) {
        next(new httpException_1.default(error.status, error.message));
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map