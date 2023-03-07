import {IsNotEmpty, IsString } from "class-validator";

export class loginDto {

	@IsNotEmpty()
	@IsString()
	userName: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}