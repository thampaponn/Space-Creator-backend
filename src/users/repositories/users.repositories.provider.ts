import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { USERS_REPOSITORY_TOKEN } from './users.repositories.interface';
import { HashingService } from 'src/shared/hashing/hashing.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersTypeOrmRepository } from './implementations/users.typeorm.repositories';
import { DataSource } from 'src/constants';
import { config } from 'dotenv';

config();

export const configService = new ConfigService();

export function provideUsersRepository(): Provider[] {
  return [
    {
      provide: USERS_REPOSITORY_TOKEN,
      useFactory: async (dependenciesProvider: UsersRepoDependenciesProvider) =>
        provideUsersRepositoryFactory(dependenciesProvider),
      inject: [UsersRepoDependenciesProvider],
    },
    UsersRepoDependenciesProvider,
  ];
}

async function provideUsersRepositoryFactory(
  dependenciesProvider: UsersRepoDependenciesProvider,
) {
  await ConfigModule.envVariablesLoaded;

  switch (configService.get('DATASOURCE')) {
    case DataSource.TYPEORM:
      return new UsersTypeOrmRepository(
        dependenciesProvider.typeOrmRepository,
        dependenciesProvider.hashingService,
      );
  }
}

@Injectable()
export class UsersRepoDependenciesProvider {
  constructor(
    @InjectRepository(Users)
    public typeOrmRepository: Repository<Users>,
    public hashingService: HashingService,
  ) {}
}
