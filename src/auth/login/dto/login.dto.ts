import { PickType } from '@nestjs/swagger';
import { UsersDto } from 'src/users/dto/users.dto';

export class LoginDto extends PickType(UsersDto, [
  'email',
  'password',
] as const) {}
