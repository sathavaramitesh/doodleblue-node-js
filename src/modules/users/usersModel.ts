import { IsNotEmpty, MaxLength, Validate, IsEmail } from "class-validator";
import { Constants } from "../../config/constants";
import { Model } from "../../model";

export class UsersModel extends Model {

    // @IsEmail({}, { message: "ERR_INVALID_EMAIL" })
    @IsNotEmpty({ message: "ERR_EMAIL_REQUIRED" })
    public to: any;

    @IsNotEmpty({ message: "ERR_MAIL_TITLE_REQUIRED" })
    public subject: string;

    @IsNotEmpty({ message: "ERR_TEXT_REQUIRED" })
    public text: string;

    constructor(body: any) {
        super();
        const {
            to,
            subject,
            text
        } = body;
        this.to = to;
        this.subject = subject;
        this.text = text;
    }

}

