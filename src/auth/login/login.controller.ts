import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './decorators/auth-guard.decorator';
import { AuthType } from './enum/auth-type.enum';

@ApiTags('auth')
@AuthGuard(AuthType.None)
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  public async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.loginService.login(loginDto);
  }

  @Post('/refresh-token')
  public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.loginService.refreshToken(refreshTokenDto);
  }
}
