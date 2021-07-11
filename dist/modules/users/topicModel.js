"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicModel = void 0;
const class_validator_1 = require("class-validator");
const constants_1 = require("../../config/constants");
const model_1 = require("../../model");
class TopicModel extends model_1.Model {
    constructor(body) {
        super();
        this.title = body.title;
    }
}
__decorate([
    class_validator_1.MaxLength(constants_1.Constants.TOPIC_TITLE_MAX_LENGTH, { message: "ERR_MAX_LENGTH_TOPIC_TITLE" }),
    class_validator_1.IsNotEmpty({ message: "ERR_TOPIC_TITLE_REQUIRED" })
], TopicModel.prototype, "title", void 0);
exports.TopicModel = TopicModel;
//# sourceMappingURL=topicModel.js.map