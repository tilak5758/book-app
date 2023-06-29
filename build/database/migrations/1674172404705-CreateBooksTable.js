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
exports.CreateBooksTable1674172404705 = void 0;
const typeorm_1 = require("typeorm");
const DBTable_1 = require("../../constants/DBTable");
class CreateBooksTable1674172404705 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: DBTable_1.DBTable.BOOKS,
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "authorId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "price",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "category",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "image",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        default: "now()",
                        isNullable: true,
                    },
                    {
                        name: "updatedAt",
                        type: "datetime",
                        default: "now()",
                        isNullable: true,
                    },
                ],
            }), true);
            const foreignKey = new typeorm_1.TableForeignKey({
                columnNames: ["authorId"],
                referencedColumnNames: ["id"],
                referencedTableName: "authors",
                onDelete: "CASCADE",
            });
            yield queryRunner.createForeignKey(DBTable_1.DBTable.BOOKS, foreignKey);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable(DBTable_1.DBTable.BOOKS);
        });
    }
}
exports.CreateBooksTable1674172404705 = CreateBooksTable1674172404705;
