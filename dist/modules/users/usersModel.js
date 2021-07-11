"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../model");
class UsersModel extends model_1.Model {
    constructor(body) {
        super();
        const { to, subject, text } = body;
        this.to = to;
        this.subject = subject;
        this.text = text;
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: "ERR_EMAIL_REQUIRED" })
], UsersModel.prototype, "to", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "ERR_MAIL_TITLE_REQUIRED" })
], UsersModel.prototype, "subject", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "ERR_TEXT_REQUIRED" })
], UsersModel.prototype, "text", void 0);
exports.UsersModel = UsersModel;
//# sourceMappingURL=usersModel.js.map