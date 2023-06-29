"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
class ResponseUtil {
    static sendResponse(res, message, data, paginationInfo = null, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            paginationInfo,
        });
    }
    static sendErrror(res, message, statusCode = 500, error) {
        return res.status(statusCode).json({
            success: false,
            message,
            error,
        });
    }
}
exports.ResponseUtil = ResponseUtil;
