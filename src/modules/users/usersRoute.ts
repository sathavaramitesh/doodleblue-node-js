import { Router } from "express";
import { Validator } from "../../validate";
import { UsersController } from "./usersController";
import { UsersModel } from "./usersModel";
import { UsersMiddleware } from "./usersMiddleware";

const router: Router = Router();
const v: Validator = new Validator();
const usersController = new UsersController();
const usersMiddleware = new UsersMiddleware();
// send mail
const sendMail = [v.validate(UsersModel), usersMiddleware.checkForEmailExists, usersController.sendMail];
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

export const UserRoute: Router = router;
