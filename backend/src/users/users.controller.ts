import { Body, Controller, Get, Injectable, Post, Req, UseGuards } from "@nestjs/common";
import { validate } from "class-validator";
import { RegisterDto, singInDto, Intra } from "src/dto/auth.dto";
import { UsersService } from "./users.service";
import { Request } from 'express';
import { JwtGuard } from '../guard/jwt.guard';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

function GenerateToken(length: number) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for (var i = 0; i < length; i++)
        token += chars[Math.floor(Math.random() * chars.length)];
    return token;
}

@Controller("auth")
@Injectable({})
export class UsersController {
	constructor(private userService: UsersService, private prisma: PrismaService) {}
	@Post("register")
	register(@Body() dto: RegisterDto) {
		console.log("dto: "+dto);
		return (this.userService.register(dto));
	}
	
	@Post("signIn")
	signIn(@Body() dto: singInDto) {
		return (this.userService.signIn(dto));
	}

	@Post("intra")
	Intra(@Body() dto: Intra) {
		if (!dto)
            return ('404NotFound');
		return (this.userService.Intra(dto));
	}
	
	@Get('me')
	@UseGuards(JwtGuard)
    async getMe(@Req() req : Request) {
      return (req.user);
    }

	@Get('deleteAccount')
	@UseGuards(JwtGuard)
    async delete(@Req() req : Request) {
		const userJwt: RegisterDto | any = req.user;

        var user: string | any = await this.prisma.user.findUnique({
            where: {
                id: userJwt.id,
            },
        });
        /* if (user.profilePicture != "DefaultPicture")
            unlinkSync(process.cwd() + '/assets/' + user.profilePicture); */

        await this.prisma.user.delete({
            where: {
                id: userJwt.id,
            },
        });
    }

	@Post('uploadImageWithUrl')
    async uploadImageWithUrl(@Req() req: Request)
	{
		const link: string = req.query.link as string;
        const imageType = "." + link.split(".").reverse()[0];
        const userJwt: RegisterDto | any = req.user;
        const fileName = userJwt.id + "_" + GenerateToken(20) + imageType;
        const path = process.cwd() + '/assets/';
		console.log("link : " + link + "\nimage type : " + imageType + "\n file name : " + fileName + "\npath : " + path);
	}
}