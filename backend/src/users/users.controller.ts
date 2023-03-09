import { Body, Controller, Get, Post } from "@nestjs/common";
import { validate } from "class-validator";
import { RegisterDto } from "src/dto/auth.dto";
import { UsersService } from "./users.service";

@Controller("auth")
export class UsersController {
	constructor(private userService: UsersService) {}
	@Post("register")
	register(@Body() dto: RegisterDto) {
		return (this.userService.register(dto));
	}

	@Post("signIn")
	signIn(@Body() dto: RegisterDto) {
		return (this.userService.signIn(dto));
	}
}