import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UsersDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(8)
  @IsNotEmpty()
  studentId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: UserRole;


}
