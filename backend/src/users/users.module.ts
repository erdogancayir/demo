import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../strategy";
import { Twilio } from "twilio";

@Module({
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy], 
    imports: [JwtModule.register({})],
})
export class UsersModule {}