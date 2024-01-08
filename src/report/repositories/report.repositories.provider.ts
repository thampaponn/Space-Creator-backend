import { ConfigService } from '@nestjs/config';
import { REPORT_REPOSITORY_TOKEN } from './report.repositories.interface';
import { DataSource } from 'src/constants';
import { Injectable, Provider } from '@nestjs/common';
import { Report } from '../entities/report.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportTypeOrmRepository } from './implementations/report.typeorm.repositories';
export const configService = new ConfigService();

export function provideReportRepository(): Provider[] {
  return [
    {
      provide: REPORT_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: ReportRepoDependenciesProvider,
      ) => provideReportRepositoryFactory(dependenciesProvider),
      inject: [ReportRepoDependenciesProvider],
    },
    ReportRepoDependenciesProvider,
  ];
}

async function provideReportRepositoryFactory(
  dependenciesProvider: ReportRepoDependenciesProvider,
) {
  switch (configService.get('DATASOURCE')) {
    case DataSource.TYPEORM:
      return new ReportTypeOrmRepository(
        dependenciesProvider.typeOrmRepository,
      );
  }
}

@Injectable()
export class ReportRepoDependenciesProvider {
  constructor(
    @InjectRepository(Report)
    public typeOrmRepository: Repository<Report>,
  ) {}
}
