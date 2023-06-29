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
exports.BooksController = void 0;
const class_validator_1 = require("class-validator");
const data_source_1 = require("../../database/data-source");
const Paginator_1 = require("../../database/Paginator");
const Response_1 = require("../../utils/Response");
const Book_1 = require("./../../database/entities/Book");
const BookDTO_1 = require("./../dtos/BookDTO");
class BooksController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = yield data_source_1.AppDataSource.getRepository(Book_1.Book)
                .createQueryBuilder("book")
                .leftJoinAndSelect("book.author", "author")
                .orderBy("book.id", "DESC");
            const { records: books, paginationInfo } = yield Paginator_1.Paginator.paginate(builder, req);
            const bookData = books.map((book) => {
                return book.toPayload();
            });
            return Response_1.ResponseUtil.sendResponse(res, "Fetched books successfully", bookData, paginationInfo);
        });
    }
    getBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const book = yield data_source_1.AppDataSource.getRepository(Book_1.Book).findOneByOrFail({
                id: Number(id),
            });
            return Response_1.ResponseUtil.sendResponse(res, "Fetch book successfully", book.toPayload());
        });
    }
    create(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const bookData = req.body;
            bookData.image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            const dto = new BookDTO_1.CreateBookDTO();
            Object.assign(dto, bookData);
            dto.price = parseInt(bookData.price);
            dto.authorId = parseInt(bookData.authorId);
            yield (0, class_validator_1.validateOrReject)(dto);
            const repo = data_source_1.AppDataSource.getRepository(Book_1.Book);
            const book = repo.create(bookData);
            yield repo.save(book);
            return Response_1.ResponseUtil.sendResponse(res, "Successfully created new book", book, null);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const bookData = req.body;
            const dto = new BookDTO_1.UpdateBookDTO();
            Object.assign(dto, bookData);
            dto.id = parseInt(id);
            yield (0, class_validator_1.validateOrReject)(dto);
            const repo = data_source_1.AppDataSource.getRepository(Book_1.Book);
            const book = yield repo.findOneByOrFail({
                id: Number(id),
            });
            repo.merge(book, bookData);
            yield repo.save(book);
            return Response_1.ResponseUtil.sendResponse(res, "Successfully updated the book", book.toPayload());
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const repo = data_source_1.AppDataSource.getRepository(Book_1.Book);
            const book = yield repo.findOneByOrFail({
                id: Number(id),
            });
            yield repo.remove(book);
            return Response_1.ResponseUtil.sendResponse(res, "Successfully deleted the book", null);
        });
    }
}
exports.BooksController = BooksController;
