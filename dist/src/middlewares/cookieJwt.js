"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const jwtSecret = process.env.JWT_KEY;
        if (jwtSecret) {
            const user = jsonwebtoken_1.default.verify(token, jwtSecret);
            req.user = user;
            console.log(user);
        }
    }
    catch (err) {
        res.clearCookie("token");
        return res.redirect("/");
    }
};
//# sourceMappingURL=cookieJwt.js.map