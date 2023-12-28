import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { provideRoomsRepository } from './repositories/rooms.repositories.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from './entities/rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms])],
  controllers: [RoomsController],
  providers: [
    RoomsService, 
    ...provideRoomsRepository()],
})
export class RoomsModule {}
