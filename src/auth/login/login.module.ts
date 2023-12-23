import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Users } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/users.service';
import { provideUsersRepository } from 'src/users/repositories/users.repositories.provider';
import { HashingService } from 'src/shared/hashing/hashing.service';
import { BcryptService } from 'src/shared/hashing/bcrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    UserService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    ...provideUsersRepository(),
  ],
})
export class LoginModule {}
