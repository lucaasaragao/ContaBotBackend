import { injectable } from "tsyringe"

import { IMailProvider, IMessage } from "@providers/mailProvider/IMailProvider"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

@injectable()
export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "defaultproject@gmail.com",
        clientId: "",
        clientSecret: "",
        refreshToken: "",
        accessToken: ""
      }
    })
  }

  async send(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.body
    })
  }
}

