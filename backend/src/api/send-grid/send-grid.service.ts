import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as sgMail from '@sendgrid/mail';
import { SENDER_EMAIL } from "src/constants";

export interface IEmail {
    reciever: string;
    subject: string;
    message: string;
}

@Injectable()
export class SendGridService {
    private readonly apiKey: string;

    constructor(private readonly configService: ConfigService) {
        this.apiKey = this.configService.get<string>('API_KEY');
    }

    async sendEmail(email: IEmail) {
        const emailToSend = {
            to: email.reciever,
            from: SENDER_EMAIL,
            subject: email.subject,
            text: email.message,
            reply_to: SENDER_EMAIL
        }

        try {
            sgMail.setApiKey(this.apiKey)
            await sgMail.send(emailToSend)
        } catch (error) {
            throw new HttpException('Failed to send email', HttpStatus.BAD_REQUEST)
        }
    }
}