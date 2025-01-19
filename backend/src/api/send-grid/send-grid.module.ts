import { Module } from "@nestjs/common";
import { SendGridController } from "./send-grid.controller";
import { ConfigModule } from "@nestjs/config";
import { SendGridService } from "./send-grid.service";

@Module({
    imports: [ConfigModule],
    controllers: [SendGridController],
    providers: [SendGridService]
})

export class SendGridModule {}