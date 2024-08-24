"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(isSuccess = false, data = {}, errorMessage = "", statusCode = 200) {
        this.isSuccess = isSuccess;
        this.data = data;
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
    }
}
exports.ApiResponse = ApiResponse;
