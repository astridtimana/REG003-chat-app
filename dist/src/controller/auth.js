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
exports.login = void 0;
const client_1 = __importDefault(require("../db/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../helpers/generateToken");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email && !password) {
            return res.status(400).json({
                error: 'Bad request'
            });
        }
        //Verificar si existe el correo
        const existingUser = yield client_1.default.user.findUnique({
            where: {
                email: email
            },
        });
        //Verificar el password
        const validPassword = bcryptjs_1.default.compareSync(password, existingUser.password);
        if (!validPassword) {
            return res.status(400).json({
                error: 'Wrong password'
            });
        }
        const token = yield (0, generateToken_1.generateToken)(existingUser.id);
        res.cookie("token", token, { expires: new Date(Date.now() + 1800000) });
        res.status(200).json({ email: existingUser.email, name: existingUser.name, id: existingUser.id /* , token */ });
    }
    catch (error) {
        return res.status(404).json({ error: 'User not found' });
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map