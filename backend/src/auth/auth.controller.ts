import { Controller, Get, Post } from "@nestjs/common";
import { get } from "http";

@Controller("auth")
export class AuthController {
    @Post("register")
    registerMethod() {
        return "Register method works";
    }
}
