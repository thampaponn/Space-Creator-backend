import { RoomsDto } from "src/rooms/dto/rooms.dto";
import { CreateRoomDto } from "../dto/create-room.dto";
import { UpdateRoomDto } from "../dto/update-room.dto";

export interface RoomsRepository {
    findAll();
    findByName(name: string);
    findById(id: string);
    create(room: CreateRoomDto);
    update(id: string, room: UpdateRoomDto);
    delete(id: string);
}

export const ROOMS_REPOSITORY_TOKEN = 'ROOMS_REPOSITORY';