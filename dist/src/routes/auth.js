"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const package_json_1 = __importDefault(require("../../package.json"));
const router = (0, express_1.Router)();
router.post('/', auth_1.login);
router.get('/', (req, res) => res.json({ name: package_json_1.default.name, version: package_json_1.default.version }));
exports.default = router;
//# sourceMappingURL=auth.js.map