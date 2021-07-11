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
exports.UsersUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../config/tables");
class UsersUtils {
    saveMailData(sendMailInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insert(tables_1.Tables.MAILS, sendMailInfo);
        });
    }
    saveRelationdata(relationInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insert(tables_1.Tables.RELATIONS, relationInfo);
        });
    }
    getUserDetail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.first(tables_1.Tables.USER, ['id, firstName, lastName, email, createdAt, updatedAt'], "email = ?", [email]);
        });
    }
    getUserDetailByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield My.first(tables_1.Tables.USER, ['id, firstName, lastName, email, createdAt, updatedAt'], `email = ?`, [email]);
            return result;
        });
    }
    getInbox(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = `${tables_1.Tables.RELATIONS} as r INNER JOIN ${tables_1.Tables.MAILS} as m ON m.id = r.mailId INNER JOIN ${tables_1.Tables.USER} as u ON u.id = m.fromId`;
            const selectFields = ['m.id, m.subject, m.text, r.createdAt, u.id as senderId, u.firstName, u.lastName, u.email'];
            return yield My.findAll(model, selectFields, `r.toId = ${userId}`, ` ORDER BY r.createdAt ASC`);
        });
    }
    getSent(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = `${tables_1.Tables.MAILS} as m INNER JOIN ${tables_1.Tables.RELATIONS} as r ON r.mailId = m.id INNER JOIN ${tables_1.Tables.USER} as u ON u.id = r.toId`;
            const selectFields = ['m.id, m.subject, m.text, r.createdAt, u.id as senderId, u.firstName, u.lastName, u.email'];
            return yield My.findAll(model, selectFields, `m.fromId = ${userId}`, ` ORDER BY r.createdAt ASC`);
        });
    }
    mailInfo(mailId) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = `${tables_1.Tables.MAILS} as m INNER JOIN ${tables_1.Tables.RELATIONS} as r ON r.mailId = m.id INNER JOIN ${tables_1.Tables.USER} as u ON u.id = r.toId INNER JOIN ${tables_1.Tables.USER} as u1 ON u1.id = m.fromId`;
            const selectFields = ['m.id, m.subject, m.text, r.createdAt, u1.id as senderId, u1.firstName as senderFirstName, u1.lastName as senderLastName, u1.email as senderEmail, u.id as receiverId, u.firstName as receiverFirstName, u.lastName as receiverLastName, u.email as receiverEmail'];
            return yield My.first(model, selectFields, `m.id = ${mailId}`, ``);
        });
    }
    getAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            return My.findAll(tables_1.Tables.USER, ['id, firstName, lastName, email, createdAt, updatedAt'], ``);
        });
    }
}
exports.UsersUtils = UsersUtils;
//# sourceMappingURL=usersUtils.js.map