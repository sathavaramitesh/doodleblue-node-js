"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../validate");
const topicController_1 = require("./topicController");
const topicModel_1 = require("./topicModel");
const router = express_1.Router();
const v = new validate_1.Validator();
const topicController = new topicController_1.TopicController();
// Create topic API
const topicCreateRoutePath = [v.validate(topicModel_1.TopicModel), topicController.createTopic];
router.post("/", topicCreateRoutePath);
// List topics with pagination API
const topicsListRoutePath = [topicController.getTopics];
router.get("/", topicsListRoutePath);
exports.TopicRoute = router;
//# sourceMappingURL=topicRoute.js.map