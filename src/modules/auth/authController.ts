import { Request, Response } from "express";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Utils } from "../../helpers/utils";
import { AuthUtils } from "./authUtils";
import * as l10n from "jm-ez-l10n";
import { Jwt } from "../../helpers/jwt";
import { SendEmail } from "../../helpers/sendEmail";

export class AuthController {
  private authUtils: AuthUtils = new AuthUtils();

  public login = async (req: Request, res: Response) => {
    const { _user } = req;
    const userData: Json = {
      userId: _user.id,
    };
    const token = Jwt.getAuthToken(userData);
    userData.token = token;
    userData.firstName = _user.firstName;
    userData.lastName = _user.lastName;
    const response = ResponseBuilder.data(userData, req.t("LOGIN_SUCCESS"));
    res.status(response.code).json(response);
  }

  public signup = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;
    const newPassword = Utils.getEncryptedPassword(password);
    const userData = {
      email,
      password: newPassword,
      firstName,
      lastName
    };
    await this.authUtils.createUser(userData);
    const responseData = ResponseBuilder.data(req.t("ACCOUNT_CREATED"));
    res.status(responseData.code).json(responseData);
  }
}
