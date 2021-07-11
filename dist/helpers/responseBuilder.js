"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBuilder = void 0;
const l10n = require("jm-ez-l10n");
const constants_1 = require("../config/constants");
class ResponseBuilder {
    static successMessage(msg) {
        const rb = new ResponseBuilder();
        rb.code = 200;
        rb.msg = msg;
        return rb;
    }
    static errorMessage(msg) {
        const rb = new ResponseBuilder();
        rb.code = 500;
        rb.error = msg != null ? msg : l10n.t("ERR_INTERNAL_SERVER");
        return rb;
    }
    static badRequest(msg) {
        const rb = new ResponseBuilder();
        rb.code = 400;
        rb.error = msg;
        return rb;
    }
    static unauthorizedRequest(msg) {
        const rb = new ResponseBuilder();
        rb.code = 401;
        rb.error = msg;
        return rb;
    }
    static data(result, msg) {
        const rb = new ResponseBuilder();
        rb.code = 200;
        rb.data = result;
        rb.msg = msg;
        return rb;
    }
    static dataWithPaginate(result, totalCount) {
        const rb = new ResponseBuilder();
        rb.code = 200;
        rb.data = result;
        rb.totalCount = totalCount;
        return rb;
    }
    static error(err) {
        const rb = new ResponseBuilder();
        if (err.type === constants_1.Constants.BAD_DATA) {
            rb.code = 400;
            rb.error = err.title;
            rb.description = err.description;
            rb.data = err.data;
            return rb;
        }
        rb.code = 500;
        rb.error = err.title || l10n.t("ERR_INTERNAL_SERVER");
        rb.description = err.description;
        rb.data = err.data;
        return rb;
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=responseBuilder.js.map