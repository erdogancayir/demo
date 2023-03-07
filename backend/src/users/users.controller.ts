import { Body, Controller, Get, Post } from "@nestjs/common";
import { validate } from "class-validator";
import { RegisterDto } from "src/dto/register.dto";
import { UsersService } from "./users.service";
import { loginDto } from "src/dto/login.dto";

@Controller("auth")
export class UsersController {
	constructor(private userService: UsersService) {}
	@Post("register")
	register(@Body() dto: RegisterDto) {
		return (this.userService.register(dto));
	}
	@Post('login')
	login(@Body() dto: loginDto) {
		return (this.userService.login(dto));
	}
}