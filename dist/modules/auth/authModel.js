"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpModel = exports.LoginModel = void 0;
const class_validator_1 = require("class-validator");
const constants_1 = require("../../config/constants");
const model_1 = require("../../model");
const authValidators_1 = require("./authValidators");
class LoginModel extends model_1.Model {
    constructor(body) {
        super();
        const { email, password, } = body;
        this.email = email;
        this.password = password;
    }
}
__decorate([
    class_validator_1.IsEmail({}, { message: "ERR_INVALID_EMAIL" }),
    class_validator_1.IsNotEmpty({ message: "ERR_EMAIL_REQUIRED" })
], LoginModel.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "ERR_PASSWORD_REQUIRED" })
], LoginModel.prototype, "password", void 0);
exports.LoginModel = LoginModel;
class SignUpModel extends model_1.Model {
    constructor(body) {
        super();
        const { email, password, firstName, lastName } = body;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
__decorate([
    class_validator_1.MaxLength(constants_1.Constants.EMAIL_MAX_LENGTH, { message: "ERR_MAX_LENGTH_EMAIL" }),
    class_validator_1.IsEmail({}, { message: "ERR_INVALID_EMAIL" }),
    class_validator_1.IsNotEmpty({ message: "ERR_EMAIL_REQUIRED" })
], SignUpModel.prototype, "email", void 0);
__decorate([
    class_validator_1.Validate(authValidators_1.IsValidPasswordConstraint, {
        message: "ERR_INVALID_PASSWORD_VALIDATIONS",
    }),
    class_validator_1.IsNotEmpty({ message: "ERR_PASSWORD_REQUIRED" })
], SignUpModel.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "ERR_NAME_REQUIRED" })
], SignUpModel.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "ERR_LAST_NAME_REQUIRED" })
], SignUpModel.prototype, "lastName", void 0);
exports.SignUpModel = SignUpModel;
//# sourceMappingURL=authModel.js.map