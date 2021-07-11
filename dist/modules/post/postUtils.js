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
exports.PostUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../config/tables");
const utils_1 = require("../../helpers/utils");
class PostUtils {
    /**
     * should be create post
     * @param postDetail post details
     */
    addTopicPost(postDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insert(tables_1.Tables.POSTS, postDetail);
        });
    }
    /**
     * should be add comment
     * @param commentDetail comment details
     */
    addUserComment(commentDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insert(tables_1.Tables.COMMENTS, commentDetail);
        });
    }
    /**
    * should be getting posts
    */
    getPosts(filterData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit, topicId } = filterData;
            const [page, pageLimit] = utils_1.Utils.getPageSkipAndLimit(skip, limit);
            let condition = `topic.userId = ? `;
            const conditionValue = [userId];
            if (topicId) {
                condition += ` AND posts.topicId = ? `;
                conditionValue.push(topicId);
            }
            conditionValue.push(pageLimit, page);
            const tables = `${tables_1.Tables.POSTS} AS posts
    LEFT JOIN ${tables_1.Tables.COMMENTS} AS comments ON comments.postId = posts.id
    LEFT JOIN ${tables_1.Tables.POST_MEDIA} AS images ON images.postId = posts.id
    JOIN ${tables_1.Tables.TOPICS} AS topic ON topic.id = posts.topicId`;
            let result = yield My.findAllWithCount(tables, [`DISTINCT posts.id`], [`posts.id,
       posts.title,
       posts.description,
       CONCAT('[',
       IF(images.id != 'NULL',GROUP_CONCAT(DISTINCT
        JSON_OBJECT(
        'image',images.image
        )
       ),''),
      ']') AS postImages,
       CONCAT('[',
        IF(comments.id != 'NULL', GROUP_CONCAT(DISTINCT
           JSON_OBJECT(
          'id', comments.id,
          'comment', comments.comment,
          'createdAt', comments.createdAt
        )
        ), ''),
        ']') AS postComments
          `], condition, ` GROUP BY posts.id ORDER BY posts.id DESC LIMIT ? OFFSET ? `, conditionValue);
            const resData = result.result.map((data) => {
                data.postImages = data && data.postImages ? utils_1.Utils.formatStringObjectsToArrayObjects(data, "postImages") : null;
                data.postComments = data && data.postComments ? utils_1.Utils.formatStringObjectsToArrayObjects(data, "postComments") : null;
                return data;
            });
            return { result: resData, count: result.count };
        });
    }
    /**
     * should be add post medias
     * @param imageData images details
     */
    insertPostMedias(imageData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.insertMany(tables_1.Tables.POST_MEDIA, imageData);
        });
    }
}
exports.PostUtils = PostUtils;
//# sourceMappingURL=postUtils.js.map