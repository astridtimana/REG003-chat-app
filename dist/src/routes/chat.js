"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_1 = require("../controller/chat");
const validateToken_1 = require("../middlewares/validateToken");
const router = (0, express_1.Router)();
router.post('/', validateToken_1.validateToken, chat_1.sendMessages);
router.get('/', validateToken_1.validateToken, chat_1.getMessages);
exports.default = router;
//# sourceMappingURL=chat.js.map