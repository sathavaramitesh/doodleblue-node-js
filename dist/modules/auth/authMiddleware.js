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
exports.AuthMiddleware = void 0;
const responseBuilder_1 = require("../../helpers/responseBuilder");
const utils_1 = require("../../helpers/utils");
const authUtils_1 = require("./authUtils");
class AuthMiddleware {
    constructor() {
        this.authUtils = new authUtils_1.AuthUtils();
        this.checkForUniqueEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const result = yield this.authUtils.getUserDetailByEmail(email);
            if (result && result.id) {
                const error = responseBuilder_1.ResponseBuilder.badRequest(req.t("ERR_EMAIL_ALREADY_USED"));
                res.status(error.code).json({ error: error.error });
                return;
            }
            else {
                next();
            }
        });
        this.checkForEmailExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const result = yield this.authUtils.getUserDetailByEmail(email);
            if (result && result.id) {
                req._user = result;
                next();
            }
            else {
                const error = responseBuilder_1.ResponseBuilder.badRequest(req.t("ERR_EMAIL_NOT_EXIST"));
                res.status(error.code).json({ error: error.error });
                return;
            }
        });
        this.validatePassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { _user } = req;
            const password = utils_1.Utils.compareHashPassword(req.body.password, _user.password);
            if (!password) {
                const error = responseBuilder_1.ResponseBuilder.badRequest(req.t("INVALID_CREDENTIALS"));
                return res.status(error.code).json({ error: error.error });
            }
            next();
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map