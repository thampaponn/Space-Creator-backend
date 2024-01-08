import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('create')
  @ApiBody({ type: CreateReportDto })
  async create(@Body() createReportDto: CreateReportDto): Promise<any> {
    try {
      return this.reportService.create(createReportDto);
    } catch (error) {
      throw new BadRequestException(error, 'Error: Report cannot be created!');
    }
  }

  @Get()
  findAll() {
    return this.reportService.findAll();
  }
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Report> {
    return this.reportService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    try {
      return this.reportService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
