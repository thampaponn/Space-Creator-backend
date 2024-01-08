import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { REPORT_REPOSITORY_TOKEN } from './repositories/report.repositories.interface';
import { ReportTypeOrmRepository } from './repositories/implementations/report.typeorm.repositories';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @Inject(REPORT_REPOSITORY_TOKEN)
    public readonly reportRepository: ReportTypeOrmRepository,
  ) {}

  public async findAll(): Promise<Report[]> {
    return this.reportRepository.findAll();
  }

  public async create(createReportDto: CreateReportDto): Promise<Report | any> {
    try {
      const checkOverlapping = await this.reportRepository.overlap(
        createReportDto.roomId,
        createReportDto.createAt,
        createReportDto.updatedAt,
      );
      if (checkOverlapping) {
        throw new HttpException(
          'Report is overlapping',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.reportRepository.create(createReportDto);
    } catch (error) {
      console.log(error);
    }
  }

  public async findById(id: string): Promise<Report> {
    const removeReport = this.reportRepository.findById(id);
    if (!removeReport) {
      throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
    }
    return this.reportRepository.findById(id);
  }

  public async delete(id: string) {
    const removeReport = this.reportRepository.findById(id);
    if (!removeReport) {
      throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
    }
    await this.reportRepository.delete(id);
    return 'Report deleted';
  }
}
