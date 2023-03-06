import { validate, IsEmail, IsNotEmpty, IsString, isEmail, isEmpty, isNotEmpty, isString } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    userName: string;
}