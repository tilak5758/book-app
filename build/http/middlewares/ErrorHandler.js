"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Response_1 = require("../../utils/Response");
class ErrorHandler {
    static catchErrors(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }
    static handleErrors(err, req, res, next) {
        console.error(err);
        if (err instanceof typeorm_1.EntityNotFoundError) {
            return Response_1.ResponseUtil.sendErrror(res, "Item/page you are looking for does not exist", 404, null);
        }
        if (err.length > 0 && err[0] instanceof class_validator_1.ValidationError) {
            const errors = ErrorHandler.formatErrors(err);
            return Response_1.ResponseUtil.sendErrror(res, "Invalid input", 422, errors);
        }
        if (err.message === "Invalid file type") {
            return Response_1.ResponseUtil.sendErrror(res, "Invalid file type", 422, null);
        }
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
        });
    }
    static formatErrors(err) {
        const errors = {};
        err.forEach((e) => {
            if (!errors[e.property]) {
                errors[e.property] = [];
            }
            errors[e.property].push(e.constraints[Object.keys(e.constraints)[0]]);
        });
        return errors;
    }
}
exports.ErrorHandler = ErrorHandler;
