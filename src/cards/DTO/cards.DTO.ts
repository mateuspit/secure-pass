import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class cardsDTO {
    @IsNotEmpty()
    @IsString()
    virtual: boolean;

    @IsNotEmpty()
    @IsString()
    card_number: string;

    @IsNotEmpty()
    @IsString()
    card_name: string;

    @IsNotEmpty()
    @IsString()
    csc: string;

    @IsNotEmpty()
    @IsString()
    card_date: string;

    @IsNotEmpty()
    @IsString()
    type: string;

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
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}