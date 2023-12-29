import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ROOMS_REPOSITORY_TOKEN } from './repositories/rooms.repositories.interface';
import { RoomsTypeOrmRepository } from './repositories/implementations/rooms.typeorm.repositories';
import { Rooms } from './entities/rooms.entity';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class RoomsService {
  constructor(
    @Inject(ROOMS_REPOSITORY_TOKEN)
    public readonly roomsRepository: RoomsTypeOrmRepository,
    private imageService: ImagesService,
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

  public async create(image: Express.Multer.File, rooms: CreateRoomDto): Promise<Rooms | any> {
    try {
      const imagedto = {
        ...image,
        originalname: `${Date.now()}`
      }
      if (imagedto) {
        await this.imageService.uploadImage(imagedto);
      }
      return await this.roomsRepository.create({ ...{ image: imagedto.originalname }, ...rooms });
    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error
      }
    }
  }

  public async update(id: string, image: Express.Multer.File, updateRooms: UpdateRoomDto): Promise<Rooms | any> {
    const updateRoom = this.roomsRepository.findById(id)
    if (!updateRoom) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND)
    }
    try {
      const imagedto = {
        ...image,
        originalname: `${Date.now()}`
      }
      if (imagedto) {
        await this.imageService.deleteImage((await updateRoom).image);
        await this.imageService.uploadImage(imagedto);
      }
      await this.roomsRepository.update(id, { ...{ image: imagedto.originalname }, ...updateRooms });
      return "Room updated successfully"
    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error
      }
    }
  }

  public async delete(id: string) {
    const removeRoom = await this.roomsRepository.findById(id);
    if (!removeRoom) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND)
    }
    await this.roomsRepository.delete(id);
    await this.imageService.deleteImage(removeRoom.image);
    return "Room deleted successfully"
  }
}

