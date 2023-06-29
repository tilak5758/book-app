"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorsController_1 = require("@http/controllers/AuthorsController");
const AdminMiddleware_1 = require("@http/middlewares/AdminMiddleware");
const AuthMiddleware_1 = require("@http/middlewares/AuthMiddleware");
const ErrorHandler_1 = require("@http/middlewares/ErrorHandler");
const FileUploader_1 = require("@http/middlewares/FileUploader");
const express_1 = __importDefault(require("express"));
const authorsController = new AuthorsController_1.AuthorsController();
const router = express_1.default.Router();
router.get("/", ErrorHandler_1.ErrorHandler.catchErrors(authorsController.getAuthors));
router.get("/:id", ErrorHandler_1.ErrorHandler.catchErrors(authorsController.getAuthor));
router.post("/", ErrorHandler_1.ErrorHandler.catchErrors(AuthMiddleware_1.AuthMiddleware.authenticate), ErrorHandler_1.ErrorHandler.catchErrors(AdminMiddleware_1.AdminMiddleware.check), FileUploader_1.FileUploader.upload("image", "authors", 2 * 1024 * 1024), ErrorHandler_1.ErrorHandler.catchErrors(authorsController.create));
router.put("/:id", ErrorHandler_1.ErrorHandler.catchErrors(AuthMiddleware_1.AuthMiddleware.authenticate), ErrorHandler_1.ErrorHandler.catchErrors(AdminMiddleware_1.AdminMiddleware.check), ErrorHandler_1.ErrorHandler.catchErrors(authorsController.update));
router.delete("/:id", ErrorHandler_1.ErrorHandler.catchErrors(AuthMiddleware_1.AuthMiddleware.authenticate), ErrorHandler_1.ErrorHandler.catchErrors(AdminMiddleware_1.AdminMiddleware.check), ErrorHandler_1.ErrorHandler.catchErrors(authorsController.delete));
exports.default = router;
