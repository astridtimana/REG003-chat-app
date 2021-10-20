"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getCurrentUser_1 = require("../controller/getCurrentUser");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.validateToken, getCurrentUser_1.getCurrentUser);
exports.default = router;
//# sourceMappingURL=currentUser.js.map