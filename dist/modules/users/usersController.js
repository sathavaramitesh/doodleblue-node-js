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
exports.UsersController = void 0;
const responseBuilder_1 = require("../../helpers/responseBuilder");
const usersUtils_1 = require("./usersUtils");
const moment = require("moment");
const _ = require("lodash");
const jwt_1 = require("../../helpers/jwt");
const authUtils_1 = require("../auth/authUtils");
class UsersController {
    constructor() {
        this.usersUtils = new usersUtils_1.UsersUtils();
        this.authUtils = new authUtils_1.AuthUtils();
        this.sendMail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { to, subject, text } = req.body;
            const mailData = { subject, text, fromId: req._user.id };
            const mailInfo = yield this.usersUtils.saveMailData(mailData);
            yield Promise.all(_.map(to, (email) => __awaiter(this, void 0, void 0, function* () {
                let userInfo = yield this.usersUtils.getUserDetail(email);
                yield this.usersUtils.saveRelationdata({ toId: userInfo.id, mailId: mailInfo.insertId });
            })));
            const response = responseBuilder_1.ResponseBuilder.successMessage(req.t("MAIL_SEND_SUCCESS"));
            res.status(response.code).json(response);
        });
        this.inbox = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req._user;
            const inboxData = yield this.usersUtils.getInbox(id);
            yield Promise.all(_.map(inboxData, (obj) => __awaiter(this, void 0, void 0, function* () {
                obj.createdAt = moment().format('DD-MM-YYYY');
            })));
            const response = responseBuilder_1.ResponseBuilder.data(inboxData);
            res.status(response.code).json(response);
        });
        this.sentMail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req._user;
            const inboxData = yield this.usersUtils.getSent(id);
            yield Promise.all(_.map(inboxData, (obj) => __awaiter(this, void 0, void 0, function* () {
                obj.createdAt = moment().format('DD-MM-YYYY');
            })));
            const response = responseBuilder_1.ResponseBuilder.data(inboxData);
            res.status(response.code).json(response);
        });
        this.view = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { mailId } = req.params;
            const mailInfo = yield this.usersUtils.mailInfo(mailId);
            mailInfo.createdAt = moment().format('DD-MM-YYYY');
            const response = responseBuilder_1.ResponseBuilder.dataWithPaginate(mailInfo);
            res.status(response.code).json(response);
        });
        this.switchAccount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const userData = yield this.authUtils.getUserDataById(userId);
            const token = jwt_1.Jwt.getAuthToken(userId);
            userData.token = token;
            const response = responseBuilder_1.ResponseBuilder.data(userData, req.t("SUCCESS"));
            res.status(response.code).json(response);
        });
        this.accountList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const accountInfo = yield this.usersUtils.getAccount();
            const response = responseBuilder_1.ResponseBuilder.data(accountInfo, req.t("SUCCESS"));
            res.status(response.code).json(response);
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=usersController.js.map