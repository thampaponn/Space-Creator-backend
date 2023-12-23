import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [LoginModule, RegisterModule, UsersModule],
  providers: [JwtService],
})
export class AuthModule {}
