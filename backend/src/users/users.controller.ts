import { Body, Controller, Get, Injectable, Post, Req, UseGuards } from "@nestjs/common";
import { validate } from "class-validator";
import { RegisterDto, singInDto, Intra } from "src/dto/auth.dto";
import { UsersService } from "./users.service";
import { Request } from 'express';
import { JwtGuard } from '../guard/jwt.guard';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller("auth")
@Injectable({})
export class UsersController {
	constructor(private userService: UsersService) {}
	@Post("register")
	register(@Body() dto: RegisterDto) {
		console.log("dto: "+dto);
		return (this.userService.register(dto));
	}
	
	@Post("signIn")
	signIn(@Body() dto: singInDto) {
		return (this.userService.signIn(dto));
	}

	@Post("Intra")
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
}