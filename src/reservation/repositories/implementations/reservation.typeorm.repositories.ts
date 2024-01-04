import { Repository } from "typeorm";
import { ReservationRepository } from "../reservation.repositories.interface";
import { Reservation, ReservationStatus } from "src/reservation/entities/reservation.entity";
import * as uuid from 'uuid';
import { CreateReservationDto } from "src/reservation/dto/create-reservation.dto";

export class ReservationTypeOrmRepository implements ReservationRepository {
    constructor(
        private readonly reservationRepository: Repository<Reservation>,
    ) { }

    public async findAll() {
        return await this.reservationRepository.find();
    }

    public async findById(id: string) {
        return await this.reservationRepository.findOneBy({ _id: id });
    }

    public async overlap(roomId: string, startTime: Date, endTime: Date): Promise<Reservation> {
        return await this.reservationRepository.findOneBy({ roomId, startTime, endTime });
    }

    public async create(reservationDto: CreateReservationDto) {
        reservationDto._id = uuid.v4();

        return await this.reservationRepository.save(reservationDto);
    }

    public async delete(id: string) {
        return this.reservationRepository.delete({ _id: id });
    }
}