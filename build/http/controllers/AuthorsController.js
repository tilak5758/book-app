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
exports.AuthorsController = void 0;
const data_source_1 = require("@/database/data-source");
const Author_1 = require("@/database/entities/Author");
const Paginator_1 = require("@/database/Paginator");
const Response_1 = require("@/utils/Response");
const CreateAuthorDTO_1 = require("@http/dtos/CreateAuthorDTO");
const class_validator_1 = require("class-validator");
class AuthorsController {
    getAuthors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = yield data_source_1.AppDataSource.getRepository(Author_1.Author).createQueryBuilder().orderBy("id", "DESC");
            const { records: authors, paginationInfo } = yield Paginator_1.Paginator.paginate(builder, req);
            const authorsData = authors.map((author) => {
                return author.toPayload();
            });
            return Response_1.ResponseUtil.sendResponse(res, "Fetched authors successfully", authorsData, paginationInfo);
        });
    }
    getAuthor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const author = yield data_source_1.AppDataSource.getRepository(Author_1.Author).findOneByOrFail({
                id: Number(id),
            });
            return Response_1.ResponseUtil.sendResponse(res, "Fetch author successfully", author.toPayload());
        });
    }
    create(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const authorData = req.body;
            authorData.image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            const dto = new CreateAuthorDTO_1.CreateAuthorDTO();
            Object.assign(dto, authorData);
            yield (0, class_validator_1.validateOrReject)(dto);
            const repo = data_source_1.AppDataSource.getRepository(Author_1.Author);
            const author = repo.create(authorData);
            yield repo.save(author);
            return Response_1.ResponseUtil.sendResponse(res, "Successfully created new author", author, 200);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const authorData = req.body;
            const dto = new CreateAuthorDTO_1.UpdateAuthorDTO();
            Object.assign(dto, authorData);
            dto.id = parseInt(id);
            yield (0, class_validator_1.validateOrReject)(dto);
            const repo = data_source_1.AppDataSource.getRepository(Author_1.Author);
            const author = yield repo.findOneByOrFail({
                id: Number(id),
            });
            repo.merge(author, authorData);
            yield repo.save(author);
            return Response_1.ResponseUtil.sendResponse(res, "Successfully updated the author", author.toPayload());
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const repo = data_source_1.AppDataSource.getRepository(Author_1.Author);
            const author = yield repo.findOneByOrFail({
                id: Number(id),
            });
            yield repo.remove(author);
            return Response_1.ResponseUtil.sendResponse(res, "Successfully deleted the author", null);
        });
    }
}
exports.AuthorsController = AuthorsController;
