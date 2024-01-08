import { Repository } from 'typeorm';
import { ReportRepository } from '../report.repositories.interface';
import { Report } from 'src/report/entities/report.entity';
import * as uuid from 'uuid';
import { CreateReportDto } from 'src/report/dto/create-report.dto';

export class ReportTypeOrmRepository implements ReportRepository {
  constructor(private readonly reportRepository: Repository<Report>) {}

  public async findAll() {
    return await this.reportRepository.find();
  }

  public async findById(id: string) {
    return await this.reportRepository.findOneBy({ _id: id });
  }

  public async overlap(
    roomId: string,
    createAt: Date,
    updatedAt: Date,
  ): Promise<Report> {
    return await this.reportRepository.findOneBy({
      roomId,
      createAt,
      updatedAt,
    });
  }
  F;

  public async create(reportDto: CreateReportDto) {
    reportDto._id = uuid.v4();

    return await this.reportRepository.save(reportDto);
  }

  public async delete(id: string) {
    return this.reportRepository.delete({ _id: id });
  }
}
