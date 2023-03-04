import { validate, IsEmail, IsNotEmpty, IsString, isEmail, isEmpty, isNotEmpty, isString } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class RegisterDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	lastname: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}