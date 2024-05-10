import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  private MAIL_HOST: string;
  private MAIL_USER: string;
  private MAIL_PASS: string;

  constructor() {
    this.MAIL_HOST = process.env.MAIL_HOST;
    this.MAIL_USER = process.env.MAIL_USER;
    this.MAIL_PASS = process.env.MAIL_PASS;

    this.transporter = nodemailer.createTransport({
      host: this.MAIL_HOST,
      port: 587,
      auth: {
        user: this.MAIL_USER,
        pass: this.MAIL_PASS,
      },
    });
  }

  async sendEmail(email: string, title: string, body: string) {
    try {
      let info = await this.transporter.sendMail({
        from: 'Blog App',
        to: email,
        subject: title,
        html: body,
      });

      return info;
    } catch (error) {
      throw new InternalServerErrorException(
        'Problem while sending Email',
        error,
      );
    }
  }
}
