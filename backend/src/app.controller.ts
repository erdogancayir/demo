import { AppService } from './app.service';
import { Body, Controller, Get, Post } from "@nestjs/common";
import { validate } from "class-validator";
import { RegisterDto } from "src/dto/auth.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
     console.log('Hello World!');
     return 'Hello World!';
  }
}
