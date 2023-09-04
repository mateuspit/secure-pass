import { IsNotEmpty, IsString, IsInt, IsOptional, IsDateString } from 'class-validator';

export class noteDTO {
    @IsOptional()
    @IsDateString()
    atTime?: Date

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    note: string;

    userId: number;
}