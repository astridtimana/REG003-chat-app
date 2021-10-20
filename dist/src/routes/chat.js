"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = require("../middlewares/validateToken");
const router = (0, express_1.Router)();
router.post('/', validateToken_1.validateToken, (req, res, next) => {
    res.json({
        msg: 'ok'
    });
});
exports.default = router;
//# sourceMappingURL=chat.js.map