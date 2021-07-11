import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Utils } from "../../helpers/utils";
import { UsersUtils } from "./usersUtils";
import { async } from "q";
import * as _ from "lodash";

export class UsersMiddleware {
    private usersUtils: UsersUtils = new UsersUtils();

    public checkForEmailExists = async (req, res, next) => {
        const { to } = req.body;
        const mailArray = [];
        await Promise.all(_.map(to, async (email) => {
            const result = await this.usersUtils.getUserDetailByEmail(email);
            if (result && result.id) {
                // req._user = result;
            } else {
                mailArray.push(email)
            }
        }));
        if(mailArray.length > 0) {
            const error = ResponseBuilder.badRequest(req.t("ERR_EMAIL_NOT_FOUND", { data: mailArray}));
            res.status(error.code).json({ error: error.error });
            return;
        } else {
            next();
        }
    }
}
