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
exports.SeedAdminUser1674889592746 = void 0;
const Role_1 = require("../../constants/Role");
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
class SeedAdminUser1674889592746 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const userData = new User_1.User();
            userData.email = "admin@bookie.local";
            userData.name = "Admin user";
            userData.role = Role_1.Roles.ADMIN;
            userData.password = "password123";
            const user = repo.create(userData);
            yield repo.save(user);
            console.info("Done....");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = yield repo.findOneBy({
                email: "admin@bookie.local",
            });
            if (user) {
                yield repo.remove(user);
            }
        });
    }
}
exports.SeedAdminUser1674889592746 = SeedAdminUser1674889592746;
