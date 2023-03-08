import { Body, Delete, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { ConfigService } from "@nestjs/config";
import { RegisterDto } from "src/dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { debugPort } from "process";

@Injectable({})
export class UsersService
{
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async register(dto: RegisterDto)
    {
        try
        {
            const hash = await argon.hash(dto.password);
            const user : string | any = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    userName: dto.userName,
                }
            });
        console.log(user);
        user.winCount = 0;
        user.lossCount = 0;
        return "success";
        }
        catch (error) {
            if (error.code === "P2002")
                return ("Mail Duplicate!");
            return ("Unknown Error!");
        }
    }
}