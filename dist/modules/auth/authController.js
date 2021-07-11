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
exports.AuthController = void 0;
const responseBuilder_1 = require("../../helpers/responseBuilder");
const utils_1 = require("../../helpers/utils");
const authUtils_1 = require("./authUtils");
const jwt_1 = require("../../helpers/jwt");
class AuthController {
    constructor() {
        this.authUtils = new authUtils_1.AuthUtils();
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _user } = req;
            const userData = {
                userId: _user.id,
            };
            const token = jwt_1.Jwt.getAuthToken(userData);
            userData.token = token;
            userData.firstName = _user.firstName;
            userData.lastName = _user.lastName;
            const response = responseBuilder_1.ResponseBuilder.data(userData, req.t("LOGIN_SUCCESS"));
            res.status(response.code).json(response);
        });
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password, firstName, lastName } = req.body;
            const newPassword = utils_1.Utils.getEncryptedPassword(password);
            const userData = {
                email,
                password: newPassword,
                firstName,
                lastName
            };
            yield this.authUtils.createUser(userData);
            const responseData = responseBuilder_1.ResponseBuilder.data(req.t("ACCOUNT_CREATED"));
            res.status(responseData.code).json(responseData);
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map