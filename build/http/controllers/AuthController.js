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
exports.AuthController = void 0;
const data_source_1 = require("@/database/data-source");
const User_1 = require("@/database/entities/User");
const Response_1 = require("@/utils/Response");
const AuthDTO_1 = require("@http/dtos/AuthDTO");
const bcryptjs_1 = require("bcryptjs");
const class_validator_1 = require("class-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerData = req.body;
            const dto = new AuthDTO_1.RegisterDTO();
            dto.email = registerData.email;
            dto.name = registerData.name;
            dto.password = registerData.password;
            yield (0, class_validator_1.validateOrReject)(dto);
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = repo.create(registerData);
            yield repo.save(user);
            return Response_1.ResponseUtil.sendResponse(res, "Successfully registered", user, null);
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const dto = new AuthDTO_1.LoginDTO();
            dto.email = email;
            dto.password = password;
            yield (0, class_validator_1.validateOrReject)(dto);
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = yield repo.findOneBy({ email });
            if (!user) {
                return Response_1.ResponseUtil.sendErrror(res, "Invalid credentials", 401, null);
            }
            let passwordMatches = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatches) {
                return Response_1.ResponseUtil.sendErrror(res, "Invalid credentials", 401, null);
            }
            let accessToken = (0, jsonwebtoken_1.sign)({ userId: user.id }, process.env.ACCESS_KEY_SECRET || "secret123", {
                expiresIn: "30m",
            });
            const returnUser = user.toResponse();
            return Response_1.ResponseUtil.sendResponse(res, "User login success", { user: returnUser, accessToken });
        });
    }
}
exports.AuthController = AuthController;
