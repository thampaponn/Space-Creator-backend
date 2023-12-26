import { RoomsDto } from "src/rooms/dto/rooms.dto";

export interface RoomsRepository {
    findAll();
    findByName(name: string);
    findById(id: string);
    create(room: RoomsDto);
}

export const ROOMS_REPOSITORY_TOKEN = 'ROOMS_REPOSITORY';