import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class credentialsDTO {
    @IsDateString()
    @IsOptional()
    @ApiProperty()
    atTime?: Date

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    id?: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    user_id?: number;

    @IsNotEmpty()
    @IsUrl()
    @ApiProperty()
    url: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
}