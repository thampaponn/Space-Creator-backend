import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { RESERVATION_REPOSITORY_TOKEN } from './repositories/reservation.repositories.interface';
import { ReservationTypeOrmRepository } from './repositories/implementations/reservation.typeorm.repositories';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(RESERVATION_REPOSITORY_TOKEN)
    public readonly reservationRepository: ReservationTypeOrmRepository,
  ) { }

  public async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.findAll();
  }

  public async create(createReservationDto: CreateReservationDto): Promise<Reservation | any> {
    try {
      return await this.reservationRepository.create(createReservationDto);
    } catch (error) {
      console.log(error);
    }
  }


  public async findById(id: string): Promise<Reservation> {
    const removeReservation = this.reservationRepository.findById(id)
    if (!removeReservation) {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND)
    }
    return this.reservationRepository.findById(id);
  }

  public async delete(id: string) {
    const removeReservation = this.reservationRepository.findById(id)
    if (!removeReservation) {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND)
    }
    await this.reservationRepository.delete(id);
    return "Reservation deleted"
  }
}
