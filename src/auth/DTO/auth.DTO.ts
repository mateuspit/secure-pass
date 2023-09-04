import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class authDTO {
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

//export class singUpDTO {
//    @IsEmail()
//    @IsNotEmpty()
//    email: string;

//    @IsStrongPassword({
//        minLength: 10,
//        minNumbers: 1,
//        minLowercase: 1,
//        minUppercase: 1,
//        minSymbols: 1
//    })
//    @IsNotEmpty()
//    password: string;
//}

//export class singInDTO {
//    @IsEmail()
//    @IsNotEmpty()
//    email: string;

//    @IsStrongPassword({
//        minLength: 10,
//        minNumbers: 1,
//        minLowercase: 1,
//        minUppercase: 1,
//        minSymbols: 1
//    })
//    @IsNotEmpty()
//    password: string;
//}

