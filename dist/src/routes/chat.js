"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.validateToken, (req, res, next) => {
    res.json({
        msg: 'ok'
    });
});
exports.default = router;
//# sourceMappingURL=chat.js.map