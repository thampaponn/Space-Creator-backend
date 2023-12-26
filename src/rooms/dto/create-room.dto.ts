import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateRoomDto {
    _id: string;

    @ApiProperty()
    @IsString()
    @MaxLength(45)
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    floor: string;

    @ApiProperty()
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    detail: string;

    @ApiProperty()
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNumber()
    @MaxLength(30)
    @IsNotEmpty()
    totalSeat: number;

    @ApiProperty()
    @IsBoolean()
    @MaxLength(30)
    @IsNotEmpty()
    status: boolean;

}