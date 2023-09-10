import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";

export { User as authDTO }
export class User {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsDateString()
    @IsOptional()
    atTime?: Date;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: "user123@gmail.com",
        description: "Email given by client",
        required: true
    })
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
    @ApiProperty({
        example: "S3nh@56789",
        description: "Password with minimum lenght 10 caracters, 1 number, 1 lowercase, 1 upercase and 1 symbol. Given by client",
        required: true
    })
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

