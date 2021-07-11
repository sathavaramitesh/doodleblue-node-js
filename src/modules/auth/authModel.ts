import { IsEmail, IsNotEmpty, MaxLength, Validate } from "class-validator";
import { Constants } from "../../config/constants";
import { Model } from "../../model";
import { IsValidPasswordConstraint } from "./authValidators";

export class LoginModel extends Model {
    @IsEmail({}, { message: "ERR_INVALID_EMAIL" })
    @IsNotEmpty({ message: "ERR_EMAIL_REQUIRED" })
    public email: string;

    @IsNotEmpty({ message: "ERR_PASSWORD_REQUIRED" })
    public password: string;

    constructor(body: any) {
        super();
        const {
            email,
            password,
        } = body;

        this.email = email;
        this.password = password;
    }
}

export class SignUpModel extends Model {
    @MaxLength(Constants.EMAIL_MAX_LENGTH, { message: "ERR_MAX_LENGTH_EMAIL" })
    @IsEmail({}, { message: "ERR_INVALID_EMAIL" })
    @IsNotEmpty({ message: "ERR_EMAIL_REQUIRED" })
    public email: string;

   
    @Validate(IsValidPasswordConstraint, {
        message: "ERR_INVALID_PASSWORD_VALIDATIONS",
    })
    @IsNotEmpty({ message: "ERR_PASSWORD_REQUIRED" })
    public password: string;

    @IsNotEmpty({ message: "ERR_NAME_REQUIRED" })
    public firstName: string;
   
    @IsNotEmpty({ message: "ERR_LAST_NAME_REQUIRED" })
    public lastName: string;

    constructor(body: any) {
        super();
        const {
            email,
            password,
            firstName,
            lastName
        } = body;

        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
