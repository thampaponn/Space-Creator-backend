import { Binary, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: 'rooms' })
export class Rooms {
    @ObjectIdColumn()
    _id: string;

    @Column()
    image: string;

    @Column({ unique: true })
    name: string;

    @Column()
    floor: string;

    @Column()
    detail: string;

    @Column()
    description: string;

    @Column()
    totalSeat: number;

    @Column()
    status: boolean;


}
