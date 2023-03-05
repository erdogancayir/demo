import { validate, IsEmail, IsNotEmpty, IsString, isEmail, isEmpty, isNotEmpty, isString } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class RegisterDto {
	name: string;
	username: string;
	lastname: string;
	email: string;
	password: string;
}