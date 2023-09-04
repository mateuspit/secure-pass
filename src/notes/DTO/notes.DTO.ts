import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional, IsDateString } from 'class-validator';

export class noteDTO {
    @IsOptional()
    @IsDateString()
    @ApiProperty()
    atTime?: Date

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    note: string;

    user_id: number;
}