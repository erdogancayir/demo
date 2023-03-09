import { Body, Delete, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { ConfigService } from "@nestjs/config";
import { RegisterDto, singInDto } from "src/dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { debugPort } from "process";
import { validate } from "class-validator";

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

    async signIn(dto: singInDto) {
        const user: string | any = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user)
            return ("Wrong Email Or Password!");

        return await this.signToken(user.id, user.email, user.firstName, user.lastName, user.userName, user.winCount, user.lossCount);
    }

    async signToken(
        userId: number,
        email: string,
        firstName: string,
        lastName: string,
        userName: string,
        winCount: number,
        lossCount: number,
    ): Promise<string> {
        const payload = {
            id: userId,
            email: email,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            winCount: winCount,
            lossCount: lossCount,
        };

        const secret = await this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: secret,
            }
        );
        console.log(token);
        return token;
    }
}