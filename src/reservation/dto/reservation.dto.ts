import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ReservationStatus } from '../entities/reservation.entity';

export class ReservationDto {
  _id: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  detail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: ReservationStatus;
}
