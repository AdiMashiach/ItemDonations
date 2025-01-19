import { Body, Controller, Post } from "@nestjs/common";
import { IEmail, SendGridService } from "./send-grid.service";

@Controller('api/sendEmail')
export class SendGridController {
    constructor(private readonly emailService: SendGridService) { }

    @Post()
    async sendEmail(@Body() body: IEmail) {
        await this.emailService.sendEmail(body)
    }
}