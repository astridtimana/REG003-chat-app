"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUid = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUid = (token = '') => {
    try {
        if (process.env.JWT_KEY) {
            //@ts-ignore
            const { uid } = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            return uid;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUid = getUid;
//# sourceMappingURL=getUid.js.map