import { Rooms } from "src/rooms/entities/rooms.entity";
import { RoomsRepository } from "../rooms.repositories.interface";
import { Repository } from 'typeorm';
import { RoomsDto } from "src/rooms/dto/rooms.dto";
import * as uuid from 'uuid';
import { UpdateRoomDto } from "src/rooms/dto/update-room.dto";

export class RoomsTypeOrmRepository implements RoomsRepository {
    constructor(
        private readonly roomRepository: Repository<Rooms>,
    ) {}

    public async findAll(): Promise<Rooms[]> {
        return await this.roomRepository.find();
    }

    public async findByName(name: string): Promise<Rooms> {
        return await this.roomRepository.findOneBy({ name: name });
    }

    public async findById(id: string): Promise<Rooms> {
        return await this.roomRepository.findOneBy({_id: id});
    }

    public async create(roomsDto: RoomsDto): Promise<Rooms> {
        roomsDto._id = uuid.v4();

        return await this.roomRepository.save(roomsDto);
    }


    public async update(id: string, updateRooms: UpdateRoomDto) {
        return this.roomRepository.update(id, updateRooms);
    }

    public async delete(id: string) {
        return this.roomRepository.delete(id);
    }
}