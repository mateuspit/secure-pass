import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional, IsDateString } from 'class-validator';

export { Note as NoteDTO }
export class Note {
    @IsOptional()
    @IsDateString()
    atTime?: Date

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: `Note about secret girlfriends birthday gift`,
        description: "Title about note witch will noted, given by client",
        required: true
    })
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: `Make a portrait`,
        description: "Note witch will noted, given by client",
        required: true
    })
    note: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 1,
        description: "User index given by client used to identify note owner",
        required: true
    })
    user_id: number;
}