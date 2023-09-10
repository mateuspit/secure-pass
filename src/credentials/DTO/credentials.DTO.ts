import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export { Credential as credentialsDTO }
export class Credential {
    @IsDateString()
    @IsOptional()
    atTime?: Date

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        example: 1,
        description: "User index given by client used to identify credential owner",
        required: true
    })
    user_id?: number;

    @IsNotEmpty()
    @IsUrl()
    @ApiProperty({
        example: `https://www.instagram.com/`,
        description: "Credential URL, given by client",
        required: true
    })
    url: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: `My instagram business account login data`,
        description: "Title credential, given by client. Unique title",
        required: true
    })
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: `mybusinessmktinsta`,
        description: "Username credential, given by client",
        required: true
    })
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: `MyP455W0Rd123`,
        description: "password credential, given by client",
        required: true
    })
    password: string;
}