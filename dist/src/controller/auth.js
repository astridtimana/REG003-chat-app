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
const httpException_1 = __importDefault(require("../helpers/httpException"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../helpers/generateToken");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //Verificar si existe el correo
        const existingUser = yield client_1.default.user.findUnique({
            where: {
                email: email
            },
        });
        if (!existingUser) {
            res.status(404).json('Usuario no encontrado');
        }
        //Verificar el password
        const validPassword = bcryptjs_1.default.compareSync(password, existingUser.password);
        if (!validPassword) {
            return res.status(400).json('Password no es correcta');
        }
        const token = yield (0, generateToken_1.generateToken)(existingUser.id);
        res.cookie("token", token);
        return res.redirect('/');
        // res.json({email:existingUser.email , name:existingUser.name , id:existingUser.id , token})
    }
    catch (error) {
        next(new httpException_1.default(error.status, error.message));
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map