"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../validate");
const postController_1 = require("./postController");
const postModel_1 = require("./postModel");
const router = express_1.Router();
const v = new validate_1.Validator();
const postController = new postController_1.PostController();
// Create post API
const postCreateRoutePath = [v.validate(postModel_1.PostModel), postController.createTopicPost];
router.post("/", postCreateRoutePath);
// Create comment for post API
const commentAddRoutePath = [v.validate(postModel_1.CommentModel), postController.addUserComment];
router.post("/comment", commentAddRoutePath);
// List posts with pagination API
const postsListRoutePath = [postController.getPosts];
router.get("/", postsListRoutePath);
exports.PostRoute = router;
//# sourceMappingURL=postRoute.js.map