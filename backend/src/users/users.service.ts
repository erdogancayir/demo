import { Body, Delete, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { ConfigService } from "@nestjs/config";
import { RegisterDto } from "src/dto/auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable({})
export class UsersService
{
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async register(dto: RegisterDto)
    {
        const hash = await argon.hash(dto.password);
        
        return ;
    }
}