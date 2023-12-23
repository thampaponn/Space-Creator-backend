import { Inject, Injectable } from '@nestjs/common';
import { UsersTypeOrmRepository } from './repositories/implementations/users.typeorm.repositories';
import { USERS_REPOSITORY_TOKEN } from './repositories/users.repositories.interface';
import { UsersDto } from './dto/users.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    public readonly usersRepository: UsersTypeOrmRepository,
  ) {}

  public async findAll(): Promise<Users[]> {
    return await this.usersRepository.findAll();
  }

  public async findOneByEmail(email: string): Promise<Users> {
    return await this.usersRepository.findByEmail(email);
  }

  public async findBySub(sub: string): Promise<Users> {
    return await this.usersRepository.findBySub(sub);
  }

  public async findById(id: string): Promise<Users> {
    return await this.usersRepository.findById(id);
  }

  public async create(user: UsersDto): Promise<Users> {
    return await this.usersRepository.create(user);
  }
}
