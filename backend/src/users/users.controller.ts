import { Controller, Get, Post } from "@nestjs/common";

@Controller("auth")
export class UsersController {
	@Post("register")
	getAll() {
		return "Get all persons";
	}
}