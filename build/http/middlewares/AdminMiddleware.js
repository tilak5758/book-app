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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMiddleware = void 0;
const Role_1 = require("../../constants/Role");
const Response_1 = require("../../utils/Response");
class AdminMiddleware {
    static check(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const user = req.user;
            if (user.role != Role_1.Roles.ADMIN) {
                return Response_1.ResponseUtil.sendErrror(res, "Unauthorized", 403, null);
            }
            next();
        });
    }
}
exports.AdminMiddleware = AdminMiddleware;
