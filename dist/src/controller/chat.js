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
exports.getMessages = exports.sendMessages = void 0;
const client_1 = __importDefault(require("../db/client"));
const sendMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myId = req.uid;
        const { toId, msg } = req.body;
        const newMessage = {
            userId: Number(myId),
            toId: Number(toId),
            body: msg
        };
        const sendMsg = yield client_1.default.message.create({ data: newMessage });
        res.status(200).json({ data: sendMsg });
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Internal server error');
    }
});
exports.sendMessages = sendMessages;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('holi');
    try {
        console.log('linea28');
        const id = req.params.uid;
        const msgFrom = req.params.from;
        const last30 = yield client_1.default.message.findMany({
            where: {
                OR: [
                    {
                        from: Number(id),
                        //@ts-ignore
                        to: Number(msgFrom)
                    },
                    {
                        to: Number(id),
                        //@ts-ignore
                        from: Number(msgFrom)
                    },
                ],
            },
            orderBy: [
                {
                    createdAt: 'asc',
                },
            ],
            take: 30
        });
        res.status(200).json(last30);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getMessages = getMessages;
//# sourceMappingURL=chat.js.map