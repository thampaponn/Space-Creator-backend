import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ReportStatus } from '../entities/report.entity';

export class ReportDto {
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
  createAt: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  updateAt: Date;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  detail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: ReportStatus;
}
