import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersController } from './users.controller';
import { HashingService } from 'src/shared/hashing/hashing.service';
import { BcryptService } from 'src/shared/hashing/bcrypt.service';
import { provideUsersRepository } from './repositories/users.repositories.provider';
import { UserService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    UserService,
    JwtService,
    ...provideUsersRepository(),
  ],
})
export class UsersModule {}
