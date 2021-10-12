"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import bodyParser from 'body-parser';
const user_1 = __importDefault(require("../routes/user"));
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
// import http from 'http';
// import * as pkg from '../../package.json'
class Server {
    constructor() {
        this.apiPaths = {
            users: '/users'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        // Http server
        // this.server = http.createServer( this.app ); --- ES NECESARIO? 
        this.middlewares();
        this.routes();
        // this.app.set('pkg', pkg);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        // this.app.use(bodyParser)
        this.app.use(errorHandler_1.default);
        // this.app.use(express.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(this.apiPaths.users, user_1.default);
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