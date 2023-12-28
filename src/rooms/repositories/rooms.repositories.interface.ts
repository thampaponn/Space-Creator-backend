import { RoomsDto } from "src/rooms/dto/rooms.dto";

export interface RoomsRepository {
    findAll();
    findByName(name: string);
    findById(id: string);
    create(room: RoomsDto);
    update(id: string, room: RoomsDto);
    delete(id: string);
}

export const ROOMS_REPOSITORY_TOKEN = 'ROOMS_REPOSITORY';