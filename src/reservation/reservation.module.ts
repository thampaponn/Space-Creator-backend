import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { provideReservationRepository } from './repositories/reservation.repositories.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationController],
  providers: [ReservationService, ...provideReservationRepository()],
})
export class ReservationModule {}
