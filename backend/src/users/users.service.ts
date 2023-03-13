import { Body, Delete, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { ConfigService } from "@nestjs/config";
import { RegisterDto, singInDto, Intra } from "src/dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { debugPort } from "process";
import * as bcrypt from 'bcrypt';
import { app } from "../main"

@Injectable({})
export class UsersService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async register(dto: RegisterDto) {
        try {
            const hash = await argon.hash(dto.password);
            const user: string | any = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    userName: dto.userName,
                }
            });
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
        if (!user || await argon.verify(user.hash, dto.password) == false)
            return "fail";
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
        return token;
    }

    async Intra(intra: Intra) {
        const form = new FormData();
        form.append('grant_type', 'authorization_code');
        form.append('client_id', process.env.INTRA_UID as string);
        form.append('client_secret', process.env.INTRA_SECRET as string);
        form.append('code', intra.code);
        form.append('redirect_uri', process.env.INTRA_REDIRECT_URI as string);

        const responseToken = await fetch('https://api.intra.42.fr/oauth/token', {
            method: 'POST',
            body: form
        });
        const dataToken = await responseToken.json();

        const responseInfo = await fetch('https://api.intra.42.fr/v2/me', {
            headers: {
                'Authorization': 'Bearer ' + dataToken.access_token
            }
        });

        const dataInfo = await responseInfo.json();

        var dto: RegisterDto = {
            email: dataInfo.email,
            password: process.env.BACKEND_GENERAL_SECRET_KEY as string,
            firstName: dataInfo.first_name,
            lastName: dataInfo.last_name,
            userName: dataInfo.login
        }

        var firstSingIn = false;
        var user: string | any = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) {
            await this.register(dto);

            user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            firstSingIn = true;
        }

        const jwtToken = await this.signToken(user.id, user.email, user.firstName, user.lastName, user.userName, user.winCount, user.lossCount);
        if (firstSingIn) {
            const serverUrl = await app.getUrl();
            await fetch(serverUrl + "/auth/uploadImageWithUrl?link=" + dataInfo.image.link, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + jwtToken
                }

            });
            console.log("out");
        }
        return jwtToken;
    }
}