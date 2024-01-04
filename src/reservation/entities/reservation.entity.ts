import { Column, Entity, ObjectIdColumn } from "typeorm";

export enum ReservationStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
  }

@Entity({ name: 'reservation' })
export class Reservation {
    @ObjectIdColumn()
    _id: string;

    @Column()
    userId: string;

    @Column()
    roomId: string;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;
    
    @Column()
    detail: string;

    @Column({
        type: "enum",
        enum: ReservationStatus,
        default: ReservationStatus.PENDING
    })
    status: ReservationStatus
}
