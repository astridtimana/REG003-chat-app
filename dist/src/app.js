"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
// Configurar dotenv
dotenv_1.default.config();
// Inicializando servidor
exports.server = new server_1.default();
exports.server.execute();
//# sourceMappingURL=app.js.map