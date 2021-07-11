
import { Jwt } from "./helpers/jwt";
import { ResponseBuilder } from "./helpers/responseBuilder";
import { AuthUtils } from "./modules/auth/authUtils";

export class Middleware {
    private authUtils: AuthUtils = new AuthUtils();

    public authenticateUser = async (req, res, next) => {
        if (req.headers["x-auth-token"]) {
            const token = req.headers["x-auth-token"];
            const decoded = Jwt.decodeAuthToken(
                token,
            );
            if (decoded && decoded.userId) {
                const user = await this.authUtils.getUserDataById(decoded.userId);
                if (user) {
                    req._user = user;
                    next();
                } else {
                    const error = ResponseBuilder.unauthorizedRequest(req.t("ERR_UNAUTH"));
                    res.status(error.code).json({ error: error.error });
                    return;
                }
            } else {
                const error = ResponseBuilder.unauthorizedRequest(req.t("ERR_UNAUTH"));
                res.status(error.code).json({ error: error.error });
                return;
            }
        } else {
            const error = ResponseBuilder.unauthorizedRequest(req.t("ERR_UNAUTH"));
            res.status(error.code).json({ error: error.error });
            return;
        }
    }

}

