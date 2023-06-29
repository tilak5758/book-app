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
exports.ImagesController = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Response_1 = require("../../utils/Response");
class ImagesController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, id } = req.params;
            const imagesTypes = ["authors", "books"];
            if (!imagesTypes.includes(type)) {
                return Response_1.ResponseUtil.sendErrror(res, "Invalid image type", 500, null);
            }
            let filePath = path_1.default.join(__dirname, "../../../", "uploads", type, id);
            if (!fs_1.default.existsSync(filePath)) {
                return Response_1.ResponseUtil.sendErrror(res, "Invalid image", 404, null);
            }
            fs_1.default.readFile(filePath, (err, data) => {
                if (err) {
                    return Response_1.ResponseUtil.sendErrror(res, "Invalid image / image read error", 404, null);
                }
                res.set("Content-Type", "image/jpeg");
                res.send(data);
            });
        });
    }
}
exports.ImagesController = ImagesController;
