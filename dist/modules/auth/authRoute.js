"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../validate");
const authController_1 = require("./authController");
const authMiddleware_1 = require("./authMiddleware");
const authModel_1 = require("./authModel");
const router = express_1.Router();
const v = new validate_1.Validator();
const authController = new authController_1.AuthController();
const authMiddleware = new authMiddleware_1.AuthMiddleware();
// sign-up API
const SignupRoutePath = [v.validate(authModel_1.SignUpModel), authMiddleware.checkForUniqueEmail, authController.signup];
router.post("/sign-up", SignupRoutePath);
// login API
const LoginRoutePath = [v.validate(authModel_1.LoginModel), authMiddleware.checkForEmailExists, authMiddleware.validatePassword, authController.login];
router.post("/login", LoginRoutePath);
exports.AuthRoute = router;
//# sourceMappingURL=authRoute.js.map