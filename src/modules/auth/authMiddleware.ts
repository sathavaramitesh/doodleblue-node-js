import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Utils } from "../../helpers/utils";
import { AuthUtils } from "./authUtils";

export class AuthMiddleware {
    private authUtils: AuthUtils = new AuthUtils();

    public checkForUniqueEmail = async (req, res, next) => {
        const { email } = req.body;
        const result = await this.authUtils.getUserDetailByEmail(email);
        if (result && result.id) {
            const error = ResponseBuilder.badRequest(req.t("ERR_EMAIL_ALREADY_USED"));
            res.status(error.code).json({ error: error.error });
            return;
        } else {
            next();
        }
    }

    public checkForEmailExists = async (req, res, next) => {
        const { email } = req.body;
        const result = await this.authUtils.getUserDetailByEmail(email);
        if (result && result.id) {
            req._user = result;
            next();
        } else {
            const error = ResponseBuilder.badRequest(req.t("ERR_EMAIL_NOT_EXIST"));
            res.status(error.code).json({ error: error.error });
            return;
        }
    }

    public validatePassword = async (req, res, next) => {
        const { _user } = req;
        const password = Utils.compareHashPassword(req.body.password, _user.password);
        if (!password) {
            const error = ResponseBuilder.badRequest(req.t("INVALID_CREDENTIALS"));
            return res.status(error.code).json({ error: error.error });
        }
        next();
    }


}
