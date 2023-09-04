import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class credentialsDTO {
    @IsDateString()
    @IsOptional()
    atTime?: Date

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsNumber()
    user_id?: number;

    @IsNotEmpty()
    @IsUrl()
    url: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}