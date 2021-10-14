"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const express_validator_1 = require("express-validator");
const validateFields = (request, response, next) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({
            errors: errors.mapped()
        });
    }
    next();
};
exports.validateFields = validateFields;
//# sourceMappingURL=validateFields.js.map