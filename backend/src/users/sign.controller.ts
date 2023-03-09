import { JwtGuard } from './../auth/guard/jwt.guard';
import { Body, Controller, Get, Injectable, Req, UseGuards  } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { UserDto } from './dto';
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
	
	@Get('me')
	//@UseGuards(JwtGuard)
    async getMe(@Req() req : Request) {
      return (req.user);
    }
}