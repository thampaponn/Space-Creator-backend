import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, HttpStatus } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiBody } from '@nestjs/swagger';
import { Rooms } from './entities/rooms.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Post()
  @ApiBody({ type: CreateRoomDto })
  async create(@Body() createRoomDto: CreateRoomDto): Promise<any> {
    try {
      return await this.roomsService.create(createRoomDto);
    } catch (err) {
      throw new BadRequestException(err, 'Error: Room cannot be created!');
    }
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':name')
  public async findOne(@Param('name') name: string): Promise<Rooms> {
    return this.roomsService.findOneByName(name);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto): Promise<Rooms> {
    try {
      return await this.roomsService.update(id, updateRoomDto);
    } catch (err) {
      throw new BadRequestException(err, 'Error: Room cannot be updated!');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.roomsService.delete(id);
  }
}
