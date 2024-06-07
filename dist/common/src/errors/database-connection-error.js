"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConnectionError = void 0;
const custom_error_1 = require("./custom-error");
class databaseConnectionError extends custom_error_1.CustomError {
    constructor() {
        super('db connection error!');
        this.statusCode = 500;
    }
    generateErrors() {
        return [{ message: 'database connection error!' }];
    }
}
exports.databaseConnectionError = databaseConnectionError;
