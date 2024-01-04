import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Reservation } from './entities/reservation.entity';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post('create')
  @ApiBody({ type: CreateReservationDto })
  async create(@Body() createReservationDto: CreateReservationDto): Promise<any> {
    try {
      return this.reservationService.create(createReservationDto);
    } catch (error) {
      throw new BadRequestException(error, 'Error: Reservation cannot be created!')
    }
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Reservation> {
    return this.reservationService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    try {
      return this.reservationService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
