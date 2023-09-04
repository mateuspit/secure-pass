import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Users routes")
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get("health")
    @ApiOperation({ summary: "Check availability in route users" })
    async getHealthUserController(): Promise<string> {
        return await this.userService.getHealthUserService();
    }
}
