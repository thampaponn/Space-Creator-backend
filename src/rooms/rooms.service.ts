import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ROOMS_REPOSITORY_TOKEN } from './repositories/rooms.repositories.interface';
import { RoomsTypeOrmRepository } from './repositories/implementations/rooms.typeorm.repositories';
import { Rooms } from './entities/rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @Inject(ROOMS_REPOSITORY_TOKEN)
    public readonly roomsRepository: RoomsTypeOrmRepository,
  ) { }

  public async findAll(): Promise<Rooms[]> {
    return await this.roomsRepository.findAll();
  }

  public async findById(id: string): Promise<Rooms> {
    const findUser = this.roomsRepository.findById(id)
    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return await this.roomsRepository.findById(id);
  }

  public async findOneByName(name: string): Promise<Rooms> {
    return await this.roomsRepository.findByName(name);
  }

  public async create(rooms: CreateRoomDto): Promise<Rooms | any> {
    try {
      return await this.roomsRepository.create(rooms);
    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error
      }
    }
  }

  public async update(_id: string, updateRooms: UpdateRoomDto): Promise<Rooms | any> {
    const updateRoom = this.roomsRepository.findById(_id)
    if (!updateRoom) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND)
    }
    try {
      return await this.roomsRepository.update(_id, updateRooms);
    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error
      }
    }
  }

  public async delete(_id: string) {
    const removeUser = await this.roomsRepository.findById(_id);
    if (!removeUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return await this.roomsRepository.delete(_id);
  }
}

