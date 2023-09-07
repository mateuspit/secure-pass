import { Controller, Get, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Users routes")
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get("health")
    @ApiOperation({ summary: "Check availability in route users" })
    @ApiResponse({ status: HttpStatus.OK, description: "Users route working!" })
    async getHealthUserController(): Promise<string> {
        return await this.userService.getHealthUserService();
    }
}
