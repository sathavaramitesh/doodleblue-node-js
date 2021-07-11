import { Request, Response } from "express";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { UsersUtils } from "./usersUtils";
import { async } from "q";
import * as moment from "moment";
import * as _ from "lodash";
import { Jwt } from "../../helpers/jwt";
import { AuthUtils } from "../auth/authUtils"

export class UsersController {
    private usersUtils: UsersUtils = new UsersUtils();
    private authUtils: AuthUtils = new AuthUtils();

    public sendMail = async (req: Request, res: Response) => {
        const { to, subject, text } = req.body;
        const mailData: Json = { subject, text, fromId: req._user.id };
        const mailInfo = await this.usersUtils.saveMailData(mailData);
        await Promise.all(_.map(to, async (email) => {
            let userInfo = await this.usersUtils.getUserDetail(email);
            await this.usersUtils.saveRelationdata({ toId: userInfo.id, mailId: mailInfo.insertId })
        }));
        const response = ResponseBuilder.successMessage(req.t("MAIL_SEND_SUCCESS"));
        res.status(response.code).json(response);
    }

    public inbox = async (req: Request, res: Response) => {
        const { id } = req._user;
        const inboxData = await this.usersUtils.getInbox(id);
        await Promise.all(_.map(inboxData, async (obj) => {
            obj.createdAt = moment().format('DD-MM-YYYY');
        }))
        const response = ResponseBuilder.data(inboxData);
        res.status(response.code).json(response);
    }

    public sentMail = async (req: Request, res: Response) => {
        const { id } = req._user;
        const inboxData = await this.usersUtils.getSent(id);
        await Promise.all(_.map(inboxData, async (obj) => {
            obj.createdAt = moment().format('DD-MM-YYYY');
        }))
        const response = ResponseBuilder.data(inboxData);
        res.status(response.code).json(response);
    }

    public view = async (req: Request, res: Response) => {
        const { mailId } = req.params;
        const mailInfo = await this.usersUtils.mailInfo(mailId);
        mailInfo.createdAt = moment().format('DD-MM-YYYY');
        const response = ResponseBuilder.dataWithPaginate(mailInfo);
        res.status(response.code).json(response);
    }

    public switchAccount = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const userData = await this.authUtils.getUserDataById(userId);
        const token = Jwt.getAuthToken(userId);
        userData.token = token;
        const response = ResponseBuilder.data(userData, req.t("SUCCESS"));
        res.status(response.code).json(response);
    }

    public accountList = async (req: Request, res: Response) => {
        const accountInfo = await this.usersUtils.getAccount();
        const response = ResponseBuilder.data(accountInfo, req.t("SUCCESS"));
        res.status(response.code).json(response);
    }

}
