import { Rooms } from "src/rooms/entities/rooms.entity";
import { RoomsRepository } from "../rooms.repositories.interface";
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { UpdateRoomDto } from "src/rooms/dto/update-room.dto";
import { CreateRoomDto } from "src/rooms/dto/create-room.dto";

export class RoomsTypeOrmRepository implements RoomsRepository {
    constructor(
        private readonly roomRepository: Repository<Rooms>,
    ) { }

    public async findAll(): Promise<Rooms[]> {
        return await this.roomRepository.find();
    }

    public async findByName(name: string): Promise<Rooms> {
        return await this.roomRepository.findOneBy({ name: name });
    }

    public async findById(id: string): Promise<Rooms> {
        return await this.roomRepository.findOneBy({ _id: id });
    }

    public async create(roomsDto: CreateRoomDto): Promise<Rooms | any> {

        roomsDto._id = uuid.v4();

        return await this.roomRepository.save(roomsDto);
    }


    public async update(id: string, updateRooms: UpdateRoomDto): Promise<Rooms | any> {
        return this.roomRepository.update({ _id: id }, updateRooms);
    }

    public async delete(id: string) {
        return this.roomRepository.delete({ _id: id });
    }
}