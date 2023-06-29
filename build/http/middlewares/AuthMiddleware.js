"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Response_1 = require("../../utils/Response");
const data_source_1 = require("./../../database/data-source");
const User_1 = require("./../../database/entities/User");
class AuthMiddleware {
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization: tokenHeader } = req.headers;
            if (!tokenHeader) {
                return Response_1.ResponseUtil.sendErrror(res, "Token not provided", 401, null);
            }
            const token = tokenHeader.split(" ")[1];
            try {
                const decoded = yield jsonwebtoken_1.default.verify(token, process.env.ACCESS_KEY_SECRET || "secret123");
                // @ts-ignore
                const { userId: id } = decoded;
                const repo = data_source_1.AppDataSource.getRepository(User_1.User);
                const user = yield repo.findOneByOrFail({ id });
                // @ts-ignore
                req.user = user;
            }
            catch (error) {
                console.error(error);
                return Response_1.ResponseUtil.sendErrror(res, "Invalid token", 401, null);
            }
            next();
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
