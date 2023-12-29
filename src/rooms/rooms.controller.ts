import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Rooms } from './entities/rooms.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({ type: CreateRoomDto })
  async create(@UploadedFile() image: Express.Multer.File, @Body() createRoomDto: CreateRoomDto): Promise<any> {
    try {
      return await this.roomsService.create(image, createRoomDto);
    } catch (err) {
      throw new BadRequestException(err, 'Error: Room cannot be created!');
    }
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Rooms> {
    return this.roomsService.findById(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({ type: UpdateRoomDto })
  async update(@Param('id') id: string, @UploadedFile() image: Express.Multer.File, @Body() updateRoomDto: UpdateRoomDto): Promise<Rooms> {
    try {
      return await this.roomsService.update(id, image, updateRoomDto);
    } catch (err) {
      throw new BadRequestException(err, 'Error: Room cannot be updated!');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    try {
      return await this.roomsService.delete(id);
    } catch (err) {
      throw err;
    }
  }
}
