"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const fs = require("fs");
const lodash_1 = require("lodash");
const nodemailer = require("nodemailer");
const path = require("path");
const logger_1 = require("./logger");
class SendEmail {
}
exports.SendEmail = SendEmail;
SendEmail.sendRawMail = (emailData) => {
    const { template, replaceData, to, subject, text, bcc } = emailData;
    let html = "";
    if (template) {
        const templatesDir = path.resolve(`${__dirname}/../`, "templates");
        const content = `${templatesDir}/${template}.html`;
        html = SendEmail.getHtmlContent(content, replaceData);
    }
    const mailOptions = {
        from: process.env.DEFAULT_FROM,
        html,
        replyTo: process.env.DEFAULT_REPLY_TO,
        subject,
        to,
        bcc,
        text,
    };
    let transportObj = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER_NAME,
            pass: process.env.SMTP_PASSWORD,
        },
    };
    const transporter = nodemailer.createTransport(transportObj);
    transporter.sendMail(mailOptions, (mailSendErr, info) => {
        if (!mailSendErr) {
            SendEmail.logger.info(`Email sent: ${info.response}`);
        }
        else {
            SendEmail.logger.error(`Error in sending email: ${mailSendErr} and info ${info}`);
        }
    });
};
SendEmail.logger = logger_1.Log.getLogger();
// Just reading html file and then returns in string
SendEmail.getHtmlContent = (filePath, replaceData) => {
    const data = fs.readFileSync(filePath);
    let html = data.toString();
    lodash_1.keys(replaceData).forEach((key) => {
        html = html.replace(key, replaceData[key]);
    });
    return html;
};
//# sourceMappingURL=sendEmail.js.map