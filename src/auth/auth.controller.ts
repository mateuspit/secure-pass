import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDTO } from './DTO/auth.DTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Authentification routes")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Get("health")
    @ApiOperation({ summary: "Check availability in route Authentification" })
    @ApiResponse({ status: HttpStatus.OK, description: "Authentification route working!" })
    async getHealthAuthController(): Promise<string> {
        return await this.authService.getHealthAuthService()
    }

    @Post("sign-up")
    @ApiOperation({ summary: "Make a request for sign-up" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "Account created!" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Sign-up input data invalid!" })
    async signUpController(@Body() body: authDTO): Promise<void> {
        await this.authService.signUpAuthService(body)
    }

    @Post("sign-in")
    @ApiOperation({ summary: "Make a request for login" })
    @ApiResponse({ status: HttpStatus.OK, description: "Sucessful login!" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Email or password wrong!" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Sign-in input data invalid!" })
    async signInController(@Body() body: authDTO): Promise<object> {
        return await this.authService.signInAuthService(body);
    }
}
