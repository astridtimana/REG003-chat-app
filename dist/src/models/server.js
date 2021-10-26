"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("../routes/user"));
const auth_1 = __importDefault(require("../routes/auth"));
const chat_1 = __importDefault(require("../routes/chat"));
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
// @ts-ignore
const sockets_1 = __importDefault(require("./sockets"));
class Server {
    constructor() {
        this.apiPaths = {
            auth: '/',
            users: '/users',
            chat: '/chat',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        this.server = http_1.default.createServer(this.app);
        // this.app.set("trust proxy", 1); // es necesario?
        // Configuraciones de sockets
        this.io = new socket_io_1.Server(this.server);
    }
    middlewares() {
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:3000',
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
    configurarSockets() {
        new sockets_1.default(this.io);
    }
    execute() {
        // Inicializar Middlewares
        this.middlewares();
        this.routes();
        // Inicializar sockets
        this.configurarSockets();
        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto', this.port);
        });
    }
}
;
exports.default = Server;
//# sourceMappingURL=server.js.map