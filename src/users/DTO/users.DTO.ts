import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsStrongPassword } from "class-validator";

export class singUpInDTO {
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    id?: number;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    atTime?: Date;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsStrongPassword({
        minLength: 10,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1
    })
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}