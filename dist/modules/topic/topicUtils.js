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
exports.TopicUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../config/tables");
const utils_1 = require("../../helpers/utils");
class TopicUtils {
    /**
     * should be create post
     * @param topicDetail topics details
     */
    addTopic(topicDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insert(tables_1.Tables.TOPICS, topicDetail);
        });
    }
    /**
    * should be getting topics
    */
    getTopics(filterData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = filterData;
            const [page, pageLimit] = utils_1.Utils.getPageSkipAndLimit(skip, limit);
            let condition = '';
            const selectFields = ['id AS topicId, title, userId, createdAt, updatedAt'];
            return yield My.findAllWithCount(tables_1.Tables.TOPICS, [`DISTINCT ${tables_1.TopicsTable.ID}`], selectFields, condition, ` GROUP BY ${tables_1.TopicsTable.ID} ORDER BY ${tables_1.TopicsTable.CREATED_AT} ASC LIMIT ? OFFSET ? `, [pageLimit, page]);
        });
    }
}
exports.TopicUtils = TopicUtils;
//# sourceMappingURL=topicUtils.js.map