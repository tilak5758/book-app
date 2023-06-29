"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ErrorHandler_1 = require("./http/middlewares/ErrorHandler");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const ImagesController_1 = require("./http/controllers/ImagesController");
const auth_1 = __importDefault(require("./routes/auth"));
const authors_1 = __importDefault(require("./routes/authors"));
const books_1 = __importDefault(require("./routes/books"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const imageController = new ImagesController_1.ImagesController();
app.use("/authors", authors_1.default);
app.use("/books", books_1.default);
app.use("/auth", auth_1.default);
app.get("/images/:type/:id", imageController.get);
app.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "Invalid route",
    });
});
app.use(ErrorHandler_1.ErrorHandler.handleErrors);
exports.default = app;
