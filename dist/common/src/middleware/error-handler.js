"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const index_1 = require("../index");
const errorHandler = (error, req, res, next) => {
    if (error instanceof index_1.CustomError) {
        return res.status(error.statusCode).json({ message: error.generateErrors() });
    }
    return res.status(500).json({ message: 'something went wrong from error handler !', error });
};
exports.errorHandler = errorHandler;
