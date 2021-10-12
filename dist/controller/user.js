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
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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
        const user = yield prisma.user.create({ data: req.body });
        res.json(user);
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
        if (findUserId) {
            res.json(findUserId);
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