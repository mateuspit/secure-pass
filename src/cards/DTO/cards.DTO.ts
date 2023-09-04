import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class cardsDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    virtual: boolean;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    card_number: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    card_name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    csc: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    card_date: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    type: string;

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
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
}