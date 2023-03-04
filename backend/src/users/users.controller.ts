import { Body, Controller, Get, Post } from "@nestjs/common";
import { validate } from "class-validator";
import { RegisterDto } from "src/dto/auth.dto";

@Controller("auth")
export class UsersController {
	@Post("register")
	async getAll(@Body() dto: RegisterDto): Promise<string> {
		try {
			await validate(dto);
		  }
		  catch (errors) {
			return "Error";
		  }
	}
}