import { UsersDto } from '../dto/users.dto';

export interface UsersRepository {
  findAll();
  findByEmail(firstName: string);
  findBySub(sub: string);
  findById(id: string);
  create(user: UsersDto);
  delete(id: string);
}

export const USERS_REPOSITORY_TOKEN = 'USERS_REPOSITORY';
