import { ApiProperty } from '@nestjs/swagger';
import { ReportStatus } from '../entities/report.entity';
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateReportDto {
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
  updatedAt: Date;

  @ApiProperty()
  // eslint-disable-next-line prettier/prettier
  @IsString()
  @MaxLength(100)
  detail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: ReportStatus;
}