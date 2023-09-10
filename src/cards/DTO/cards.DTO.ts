import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export { Card as CardsDTO }
export class Card {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: false,
        description: "Indicate if the noted card it is virtual, given by client",
        required: true
    })
    virtual: boolean;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: `4556 8268 0597 9026`,
        description: "Card number, given by client",
        required: true
    })
    card_number: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: `JUAN C BELL`,
        description: "Card number, given by client",
        required: true
    })
    card_name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: `331`,
        description: "Card security code (CSC), given by client",
        required: true
    })
    csc: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: `1/2026`,
        description: "Card expire date, given by client",
        required: true
    })
    card_date: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: `Credit`,
        description: "Credit or debit type, given by client",
        required: true
    })
    type: string;

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
        description: "User index given by client used to identify card owner, given by client",
        required: true
    })
    user_id?: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: `My VISA Bank of Communism`,
        description: "Credit or debit type, given by client",
        required: true
    })
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: `033696`,
        description: "Card password, given by client",
        required: true
    })
    password: string;
}