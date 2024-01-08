import { CreateReservationDto } from '../dto/create-reservation.dto';

export interface ReservationRepository {
  findAll();
  findById(id: string);
  create(reservation: CreateReservationDto);
  delete(id: string);
}

export const RESERVATION_REPOSITORY_TOKEN = 'RESERVATION_REPOSITORY';
