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
exports.AuthUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../config/tables");
class AuthUtils {
    /** should be use for signup users
     *
     * @param userDetail Json
     */
    createUser(userDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield My.insert(`${tables_1.Tables.USER}`, userDetail);
            return newUser.insertId;
        });
    }
    /** should be used for get user detail
     *
     * @param email string
     */
    getUserDetailByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield My.first(tables_1.Tables.USER, ['id, firstName, lastName, email, password, createdAt, updatedAt'], `email = ?`, [email]);
            return result;
        });
    }
    getUserDataById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedFields = ['id, firstName, lastName, email, password'];
            const result = yield My.first(tables_1.Tables.USER, selectedFields, `id = ?`, [id]);
            return result;
        });
    }
}
exports.AuthUtils = AuthUtils;
//# sourceMappingURL=authUtils.js.map