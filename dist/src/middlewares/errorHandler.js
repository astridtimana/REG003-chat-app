"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response
        .setHeader('Content-Type', 'application/json')
        .status(status)
        .send({
        status,
        message,
    });
}
exports.default = errorMiddleware;
//# sourceMappingURL=errorHandler.js.map