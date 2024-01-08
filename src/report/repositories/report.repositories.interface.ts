import { CreateReportDto } from '../dto/create-report.dto';

export interface ReportRepository {
  findAll();
  findById(id: string);
  create(report: CreateReportDto);
  delete(id: string);
}

export const REPORT_REPOSITORY_TOKEN = 'REPORT_REPOSITORY';
