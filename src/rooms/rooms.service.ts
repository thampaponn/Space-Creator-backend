import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ROOMS_REPOSITORY_TOKEN, RoomsRepository } from './repositories/rooms.repositories.interface';
import { Rooms } from './entities/rooms.entity';
import { RoomsDto } from './dto/rooms.dto';

@Injectable()
export class RoomsService {
  constructor(
    @Inject(ROOMS_REPOSITORY_TOKEN)
    public readonly roomsRepository: RoomsRepository,
  ) { }

  public async findAll(): Promise<Rooms[]> {
    return await this.roomsRepository.findAll();
  }

  public async findById(id: string) {
    const findUser = this.roomsRepository.findById(id)
    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return await this.roomsRepository.findById(id);
  }

  public async findOneByName(name: string): Promise<Rooms> {
    return await this.roomsRepository.findByName(name);
  }

  public async create(rooms: RoomsDto): Promise<Rooms> {
    return await this.roomsRepository.create(rooms);
  }

  public async update(_id: string, updateRooms: UpdateRoomDto) {
    const updateRoom = this.roomsRepository.findById(_id)
    if (!updateRoom) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return this.roomsRepository.update(_id, updateRooms);
  }

  public async delete(_id: string) {
    const removeUser = await this.roomsRepository.findById(_id);
    if (!removeUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
  }
    return await this.roomsRepository.delete(_id);
  }
}

