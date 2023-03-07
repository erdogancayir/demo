import { Body, Delete, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { ConfigService } from "@nestjs/config";
import { RegisterDto } from "src/dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { Console } from "console";
import { loginDto } from "src/dto/login.dto";

@Injectable({})
export class UsersService
{
	constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

	async register(dto: RegisterDto)
	{
		const hash = await argon.hash(dto.password);
		try {
			await this.prisma.user.create({
				data: {
					email: dto.email,
					hash: hash,
					firstName: dto.firstName,
					lastName: dto.lastName,
					userName: dto.userName
				},
			});
			return "success";
		}
		catch (error) {
			console.log("error : " + error);
			if (error.code === "P2002")
				return ("Mail Duplicate!");
			return ("Unknown Error!");
		}
	}
	async login(dto: loginDto)
	{
		const user: string | any = await this.prisma.user.findUnique({
			where: {
				email: dto.userName,
			},
		});
		if (!user)
			return ("Wrong Email Or Password!");
		return await this.signToken(user.id, user.email, user.firstName, user.lastName, user.userName);
	}

	async signToken(
		userId: number,
		email: string,
		firstName: string,
		lastName: string,
		userName: string): Promise<string> {
		const payload = {
			id: userId,
			email: email,
			firstName: firstName,
			lastName: lastName,
			userName: userName,
		};

		const secret = await this.config.get('JWT_SECRET');

		const token = await this.jwt.signAsync(
			payload,
			{
				expiresIn: '15m',
				secret: secret,
			}
		);
		return token;
	}

}