"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const constants_1 = require("../config/constants");
const regex_1 = require("../config/regex");
const bcryptjs = require("bcryptjs");
class Utils {
    /**
     * @param page  per page
     * @param limit limit data of page
     */
    static getPageSkipAndLimit(page, limit) {
        const limits = limit ? +limit : constants_1.Constants.DEFAULT_LIMIT; // for paginate records
        const pages = page ? +page : constants_1.Constants.DEFAULT_PAGE;
        return [pages > 1 ? (pages - 1) * limits : 0, limits];
    }
    static isValidPassword(data) {
        const regex = regex_1.Regex.PASSWORD;
        return regex.test(data);
    }
    static compareHashPassword(password, existedPassword) {
        return bcryptjs.compareSync(password, existedPassword);
    }
}
exports.Utils = Utils;
Utils.getEncryptedPassword = (password) => {
    return bcryptjs.hashSync(password, constants_1.Constants.HASH_STRING_LIMIT);
};
// convert string object to array of objects
Utils.formatStringObjectsToArrayObjects = (result, type) => {
    if (result[type]) {
        result[type] = JSON.parse(result[type]);
    }
    else {
        result[type] = [];
    }
    return result[type];
};
//# sourceMappingURL=utils.js.map