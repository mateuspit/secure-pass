import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class authDTO {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsDateString()
    @IsOptional()
    atTime?: Date;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword({
        minLength: 10,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1
    })
    @IsNotEmpty()
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

