"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ErrorHandler_1 = require("../http/middlewares/ErrorHandler");
const FileUploader_1 = require("../http/middlewares/FileUploader");
const BooksController_1 = require("./../http/controllers/BooksController");
const AdminMiddleware_1 = require("./../http/middlewares/AdminMiddleware");
const AuthMiddleware_1 = require("./../http/middlewares/AuthMiddleware");
const booksController = new BooksController_1.BooksController();
const router = express_1.default.Router();
router.get("/", ErrorHandler_1.ErrorHandler.catchErrors(booksController.get));
router.get("/:id", ErrorHandler_1.ErrorHandler.catchErrors(booksController.getBook));
router.post("/", ErrorHandler_1.ErrorHandler.catchErrors(AuthMiddleware_1.AuthMiddleware.authenticate), ErrorHandler_1.ErrorHandler.catchErrors(AdminMiddleware_1.AdminMiddleware.check), FileUploader_1.FileUploader.upload("image", "books", 2 * 1024 * 1024), ErrorHandler_1.ErrorHandler.catchErrors(booksController.create));
router.put("/:id", ErrorHandler_1.ErrorHandler.catchErrors(AuthMiddleware_1.AuthMiddleware.authenticate), ErrorHandler_1.ErrorHandler.catchErrors(AdminMiddleware_1.AdminMiddleware.check), ErrorHandler_1.ErrorHandler.catchErrors(booksController.update));
router.delete("/:id", ErrorHandler_1.ErrorHandler.catchErrors(AuthMiddleware_1.AuthMiddleware.authenticate), ErrorHandler_1.ErrorHandler.catchErrors(AdminMiddleware_1.AdminMiddleware.check), ErrorHandler_1.ErrorHandler.catchErrors(booksController.delete));
exports.default = router;
