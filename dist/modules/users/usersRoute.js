"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../validate");
const usersController_1 = require("./usersController");
const usersModel_1 = require("./usersModel");
const usersMiddleware_1 = require("./usersMiddleware");
const router = express_1.Router();
const v = new validate_1.Validator();
const usersController = new usersController_1.UsersController();
const usersMiddleware = new usersMiddleware_1.UsersMiddleware();
// send mail
const sendMail = [v.validate(usersModel_1.UsersModel), usersMiddleware.checkForEmailExists, usersController.sendMail];
router.post("/send-mail", sendMail);
// inbox list 
const inbox = [usersController.inbox];
router.get("/inbox", inbox);
// sent-mail list
const sentMail = [usersController.sentMail];
router.get("/sent-mail", sentMail);
// swhich account  detail
const switchAccount = [usersController.switchAccount];
router.get("/switch-account/:userId", switchAccount);
// register user list
const accountList = [usersController.accountList];
router.get("/account-list", accountList);
// view mail detail
const view = [usersController.view];
router.get("/view/:mailId", view);
exports.UserRoute = router;
//# sourceMappingURL=usersRoute.js.map