import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { UserService } from 'src/users/users.service';
import { HashingService } from 'src/shared/hashing/hashing.service';
import { BcryptService } from 'src/shared/hashing/bcrypt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { provideUsersRepository } from 'src/users/repositories/users.repositories.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [RegisterController],
  providers: [
    RegisterService,
    UserService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    ...provideUsersRepository(),
  ],
})
export class RegisterModule {}
