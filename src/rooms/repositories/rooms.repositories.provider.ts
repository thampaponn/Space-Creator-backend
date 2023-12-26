import { Injectable, Provider } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ROOMS_REPOSITORY_TOKEN } from "./rooms.repositories.interface";
import { DataSource } from 'src/constants';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rooms } from "../entities/rooms.entity";
import { RoomsTypeOrmRepository } from "./implementations/rooms.typeorm.repositories";

export const configService = new ConfigService();

export function provideRoomsRepository(): Provider[] {
    return [
        {
            provide: ROOMS_REPOSITORY_TOKEN,
            useFactory: async (dependenciesProvider: RoomsRepoDependenciesProvider) =>
                provideRoomsRepositoryFactory(dependenciesProvider),
            inject: [RoomsRepoDependenciesProvider],
        },
        RoomsRepoDependenciesProvider,
    ];
}

async function provideRoomsRepositoryFactory(dependenciesProvider: RoomsRepoDependenciesProvider,) {
    await ConfigModule.envVariablesLoaded;

    switch (configService.get('ROOMS_DATASOURCE')) {
        case DataSource.TYPEORM:
            return new RoomsTypeOrmRepository(
                dependenciesProvider.typeOrmRepository
            );
    }
}

@Injectable()
export class RoomsRepoDependenciesProvider {
    constructor(
        @InjectRepository(Rooms)
        public typeOrmRepository: Repository<Rooms>,
    ) {}
}