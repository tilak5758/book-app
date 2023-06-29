"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUtil = void 0;
class ImageUtil {
    static prepareUrl(type, imageId) {
        return `${process.env.APP_URL}/images/${type}/${imageId}`;
    }
}
exports.ImageUtil = ImageUtil;
