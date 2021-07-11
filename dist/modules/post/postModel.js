"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = exports.PostModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../model");
class PostModel extends model_1.Model {
    constructor(body) {
        super();
        this.title = body.title;
        this.description = body.description;
        this.topicId = body.topicId;
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: "ERR_TITLE_REQUIRED" })
], PostModel.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "ERR_CONTENT_REQUIRED" })
], PostModel.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "ERR_TOPIC_ID_REQUIRED" })
], PostModel.prototype, "topicId", void 0);
exports.PostModel = PostModel;
class CommentModel extends model_1.Model {
    constructor(body) {
        super();
        this.comment = body.comment;
        this.postId = body.postId;
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: "ERR_CONTENT_REQUIRED" })
], CommentModel.prototype, "comment", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "ERR_POST_ID_REQUIRED" })
], CommentModel.prototype, "postId", void 0);
exports.CommentModel = CommentModel;
//# sourceMappingURL=postModel.js.map