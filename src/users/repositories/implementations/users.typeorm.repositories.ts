import { HashingService } from 'src/shared/hashing/hashing.service';
import { Repository } from 'typeorm';
import { UsersRepository } from '../users.repositories.interface';
import { UsersDto } from 'src/users/dto/users.dto';
import { Users } from 'src/users/entities/user.entity';
import * as uuid from 'uuid';

export class UsersTypeOrmRepository implements UsersRepository {
  constructor(
    private readonly userRepository: Repository<Users>,
    private readonly hashingService: HashingService,
  ) {}

  public async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  public async findByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }

  public async findBySub(sub: string) {
    return await this.userRepository.findOneBy({
      _id: sub,
    });
  }

  public async findById(Id: string): Promise<Users> {
    return await this.userRepository.findOneBy({
      _id: Id,
    });
  }

  public async create(userDto: UsersDto): Promise<Users> {
    userDto._id = uuid.v4();

    return await this.userRepository.save(userDto);
  }
}
