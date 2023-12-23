import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register-dto';
import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../login/decorators/auth-guard.decorator';
import { AuthType } from '../login/enum/auth-type.enum';

@ApiTags('auth')
@AuthGuard(AuthType.None)
@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiBody({ type: CreateRegisterDto })
  async create(@Body() createRegisterDto: CreateRegisterDto): Promise<any> {
    try {
      await this.registerService.register(createRegisterDto);

      return {
        message: 'User created successfully',
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new BadRequestException(err, 'Error: User not registration!');
    }
  }
}
