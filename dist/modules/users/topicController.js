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
exports.TopicController = void 0;
const responseBuilder_1 = require("../../helpers/responseBuilder");
const topicUtils_1 = require("./topicUtils");
class TopicController {
    constructor() {
        this.topicUtils = new topicUtils_1.TopicUtils();
        this.createTopic = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const { id } = req._user;
            const topicData = { title, userId: id };
            yield this.topicUtils.addTopic(topicData);
            const response = responseBuilder_1.ResponseBuilder.successMessage(req.t("TOPIC_CREATE_SUCCESS"));
            res.status(response.code).json(response);
        });
        this.getTopics = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const topicsData = yield this.topicUtils.getTopics(req.query);
            const { result, count } = topicsData;
            const response = responseBuilder_1.ResponseBuilder.dataWithPaginate(result, count);
            res.status(response.code).json(response);
        });
    }
}
exports.TopicController = TopicController;
//# sourceMappingURL=topicController.js.map