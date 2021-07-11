import * as My from "jm-ez-mysql";
import { Tables } from "../../config/tables";
import { Utils } from "../../helpers/utils";
export class UsersUtils {


  public async saveMailData(sendMailInfo: Json) {
    return await My.insert(Tables.MAILS, sendMailInfo);
  }

  public async saveRelationdata(relationInfo: Json) {
    return await My.insert(Tables.RELATIONS, relationInfo);
  }

  public async getUserDetail(email: string) {
    return await My.first(Tables.USER, ['id, firstName, lastName, email, createdAt, updatedAt'], "email = ?", [email]);
  }

  public async getUserDetailByEmail(email: string) {
    const result = await My.first(Tables.USER,['id, firstName, lastName, email, createdAt, updatedAt'],
        `email = ?`, [email],
    );
    return result;
}

public async getInbox(userId: number) {
  const model = `${Tables.RELATIONS} as r INNER JOIN ${Tables.MAILS} as m ON m.id = r.mailId INNER JOIN ${Tables.USER} as u ON u.id = m.fromId`;
  const selectFields = ['m.id, m.subject, m.text, r.createdAt, u.id as senderId, u.firstName, u.lastName, u.email']
  return await My.findAll(model, selectFields, `r.toId = ${userId}`, ` ORDER BY r.createdAt ASC`);
}

public async getSent(userId: number) {
  const model = `${Tables.MAILS} as m INNER JOIN ${Tables.RELATIONS} as r ON r.mailId = m.id INNER JOIN ${Tables.USER} as u ON u.id = r.toId`;
  const selectFields = ['m.id, m.subject, m.text, r.createdAt, u.id as senderId, u.firstName, u.lastName, u.email']
  return await My.findAll(model, selectFields, `m.fromId = ${userId}`, ` ORDER BY r.createdAt ASC`);
}

public async mailInfo(mailId: number) {
  const model = `${Tables.MAILS} as m INNER JOIN ${Tables.RELATIONS} as r ON r.mailId = m.id INNER JOIN ${Tables.USER} as u ON u.id = r.toId INNER JOIN ${Tables.USER} as u1 ON u1.id = m.fromId`;
  const selectFields = ['m.id, m.subject, m.text, r.createdAt, u1.id as senderId, u1.firstName as senderFirstName, u1.lastName as senderLastName, u1.email as senderEmail, u.id as receiverId, u.firstName as receiverFirstName, u.lastName as receiverLastName, u.email as receiverEmail']
  return await My.first(model, selectFields, `m.id = ${mailId}`, ``);
}

public async getAccount() {
  return My.findAll(Tables.USER, ['id, firstName, lastName, email, createdAt, updatedAt'], ``);
}

}
