"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    try {
        // const token = req.header('bearer')
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({
                msg: 'No hay autorización'
            });
        }
        // ponemos la coma porque no necesitamos el argumento type (que es 1°)
        const [, token] = authorization.split(' ');
        if (!token) {
            return res.status(401).json({
                msg: 'No hay token en la petición'
            });
        }
        // Verifica si el token coincide con alguno generado y que
        // tiene la signature que está en el archivo .env
        if (process.env.JWT_KEY) {
            const { uid } = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            req.uid = uid;
        }
        else {
            res.status(403).json({
                msg: 'No está autorizado'
            });
        }
        next();
    }
    catch (err) {
        return res.status(401).json({
            msg: 'Token no es válido'
        });
    }
};
exports.validateToken = validateToken;
//# sourceMappingURL=auth.js.map