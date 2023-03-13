import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ChatService } from './chat.service';
import { Module } from "@nestjs/common";
import { prismaFunc } from './prismafunc';


@Module({
    providers: [ChatService, JwtStrategy, ConfigService, prismaFunc],
    controllers: []
})
export class ChatModule {}  