"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }; // agregar más info de ser necesario
        const secret = process.env.JWT_KEY;
        if (secret) {
            jsonwebtoken_1.default.sign(payload, secret, {
                expiresIn: '1h'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Could not generate JWT');
                }
                else {
                    resolve(token);
                }
            });
        }
        else {
            throw new Error('There is no signature to token');
        }
    });
};
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map