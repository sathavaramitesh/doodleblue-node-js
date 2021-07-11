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
exports.PostController = void 0;
const fileUpload_1 = require("../../helpers/fileUpload");
const responseBuilder_1 = require("../../helpers/responseBuilder");
const postUtils_1 = require("./postUtils");
class PostController {
    constructor() {
        this.postUtils = new postUtils_1.PostUtils();
        this.createTopicPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { topicId, title, description } = req.body;
            const postData = { topicId, title, description };
            const postPhotos = [];
            const postDataRes = yield this.postUtils.addTopicPost(postData);
            if (req.files && req.files.images) {
                if (!req.files.images.length) {
                    const reqFile = req.files.images;
                    req.files.images = [];
                    req.files.images.push(reqFile);
                }
                for (const image of req.files.images) {
                    const uploadedImage = yield fileUpload_1.FileUpload.fileUploading(image);
                    const data = {
                        image: uploadedImage,
                        postId: postDataRes.insertId
                    };
                    postPhotos.push(data);
                }
            }
            if (postPhotos.length) {
                yield this.postUtils.insertPostMedias(postPhotos);
            }
            const response = responseBuilder_1.ResponseBuilder.successMessage(req.t("POST_CREATE_SUCCESS"));
            res.status(response.code).json(response);
        });
        this.addUserComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { postId, comment } = req.body;
            const { id } = req._user;
            const commentData = { postId, comment, userId: id };
            yield this.postUtils.addUserComment(commentData);
            const response = responseBuilder_1.ResponseBuilder.successMessage(req.t("COMMENT_ADDED_SUCCESS"));
            res.status(response.code).json(response);
        });
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req._user;
            const postsData = yield this.postUtils.getPosts(req.query, id);
            const { result, count } = postsData;
            const response = responseBuilder_1.ResponseBuilder.dataWithPaginate(result, count);
            res.status(response.code).json(response);
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=postController.js.map