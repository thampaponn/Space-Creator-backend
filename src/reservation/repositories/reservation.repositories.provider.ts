import { ConfigService } from '@nestjs/config';
import { RESERVATION_REPOSITORY_TOKEN } from './reservation.repositories.interface';
import { DataSource } from 'src/constants';
import { Injectable, Provider } from '@nestjs/common';
import { Reservation } from '../entities/reservation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationTypeOrmRepository } from './implementations/reservation.typeorm.repositories';
export const configService = new ConfigService();

export function provideReservationRepository(): Provider[] {
  return [
    {
      provide: RESERVATION_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: ReservationRepoDependenciesProvider,
      ) => provideReservationRepositoryFactory(dependenciesProvider),
      inject: [ReservationRepoDependenciesProvider],
    },
    ReservationRepoDependenciesProvider,
  ];
}

async function provideReservationRepositoryFactory(
  dependenciesProvider: ReservationRepoDependenciesProvider,
) {
  switch (configService.get('DATASOURCE')) {
    case DataSource.TYPEORM:
      return new ReservationTypeOrmRepository(
        dependenciesProvider.typeOrmRepository,
      );
  }
}

@Injectable()
export class ReservationRepoDependenciesProvider {
  constructor(
    @InjectRepository(Reservation)
    public typeOrmRepository: Repository<Reservation>,
  ) {}
}
