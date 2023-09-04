import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDTO } from './DTO/auth.DTO';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Authentification routes")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Get("health")
    @ApiOperation({ summary: "Check availability in route Authentification" })
    async getHealthAuthController(): Promise<string> {
        return await this.authService.getHealthAuthService()
    }

    @Post("sign-up")
    async signUpController(@Body() body: authDTO): Promise<void> {
        await this.authService.signUpAuthService(body)
    }

    @Post("sign-in")
    async signInController(@Body() body: authDTO): Promise<object> {
        return await this.authService.signInAuthService(body);
    }
}
