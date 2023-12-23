import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register-dto';
import { UserService } from 'src/users/users.service';
import { HashingService } from 'src/shared/hashing/hashing.service';
import { AccountsUser } from 'src/users/interface/accounts-users-inferface';

@Injectable()
export class RegisterService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
  ) {}
  async register(createRegisterDto: CreateRegisterDto): Promise<AccountsUser> {
    createRegisterDto.password = await this.hashingService.hash(
      createRegisterDto.password,
    );

    return this.userService.create(createRegisterDto);
  }
}
