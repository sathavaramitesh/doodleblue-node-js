import { Router } from "express";
import { Validator } from "../../validate";
import { AuthController } from "./authController";
import { AuthMiddleware } from "./authMiddleware";
import { LoginModel, SignUpModel } from "./authModel";
const router: Router = Router();

const v: Validator = new Validator();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

// sign-up API
const SignupRoutePath = [v.validate(SignUpModel), authMiddleware.checkForUniqueEmail, authController.signup];
router.post("/sign-up", SignupRoutePath);

// login API
const LoginRoutePath = [ v.validate(LoginModel), authMiddleware.checkForEmailExists, authMiddleware.validatePassword, authController.login];
router.post("/login", LoginRoutePath);

export const AuthRoute: Router = router;