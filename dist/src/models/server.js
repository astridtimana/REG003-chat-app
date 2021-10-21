"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("../routes/user"));
const auth_1 = __importDefault(require("../routes/auth"));
const chat_1 = __importDefault(require("../routes/chat"));
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class Server {
    constructor() {
        this.apiPaths = {
            auth: '/',
            users: '/users',
            chat: '/chat',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        this.app.set("trust proxy", 1);
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)({
            origin: process.env.CLIENT_URL || "http://localhost:3000",
            credentials: true,
            preflightContinue: true,
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(errorHandler_1.default);
    }
    routes() {
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.users, user_1.default);
        this.app.use(this.apiPaths.chat, chat_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}
;
exports.default = Server;
//# sourceMappingURL=server.js.map