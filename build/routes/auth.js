"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ErrorHandler_1 = require("../http/middlewares/ErrorHandler");
const AuthController_1 = require("./../http/controllers/AuthController");
const authController = new AuthController_1.AuthController();
const router = express_1.default.Router();
router.post("/register", ErrorHandler_1.ErrorHandler.catchErrors(authController.register));
router.post("/login", ErrorHandler_1.ErrorHandler.catchErrors(authController.login));
exports.default = router;
