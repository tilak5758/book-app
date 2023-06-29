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
exports.SeedInitialData1674172846008 = void 0;
class SeedInitialData1674172846008 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("INSERT IGNORE INTO authors (id, name, email, bio, image) VALUES \n" +
                "      (1, 'John Smith', 'john@example.com', 'Bio 1', 'http://localhost'), \n" +
                "      (2, 'Jane Doe', 'jane@example.com', 'Bio 2', 'http://localhost')");
            yield queryRunner.query("INSERT IGNORE INTO books (id, title, description, price, authorId, category) VALUES \n" +
                "      (1, 'The Alchemist', 'A book about following your dreams', 1099, 1, 'Fiction'), \n" +
                "      (2, 'The Subtle Art of Not Giving a F*ck', 'A book about learning to prioritize your values', 1299, 2, 'Self-help')");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM books`);
            yield queryRunner.query(`DELETE FROM authors`);
        });
    }
}
exports.SeedInitialData1674172846008 = SeedInitialData1674172846008;
