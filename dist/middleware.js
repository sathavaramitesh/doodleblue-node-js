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
exports.Middleware = void 0;
const jwt_1 = require("./helpers/jwt");
const responseBuilder_1 = require("./helpers/responseBuilder");
const authUtils_1 = require("./modules/auth/authUtils");
class Middleware {
    constructor() {
        this.authUtils = new authUtils_1.AuthUtils();
        this.authenticateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.headers["x-auth-token"]) {
                const token = req.headers["x-auth-token"];
                const decoded = jwt_1.Jwt.decodeAuthToken(token);
                if (decoded && decoded.userId) {
                    const user = yield this.authUtils.getUserDataById(decoded.userId);
                    if (user) {
                        req._user = user;
                        next();
                    }
                    else {
                        const error = responseBuilder_1.ResponseBuilder.unauthorizedRequest(req.t("ERR_UNAUTH"));
                        res.status(error.code).json({ error: error.error });
                        return;
                    }
                }
                else {
                    const error = responseBuilder_1.ResponseBuilder.unauthorizedRequest(req.t("ERR_UNAUTH"));
                    res.status(error.code).json({ error: error.error });
                    return;
                }
            }
            else {
                const error = responseBuilder_1.ResponseBuilder.unauthorizedRequest(req.t("ERR_UNAUTH"));
                res.status(error.code).json({ error: error.error });
                return;
            }
        });
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map