import { Column, Entity, ObjectIdColumn } from 'typeorm';

export enum ReportStatus {
  PENDING = 'pending',
  APPROVED = 'done',
}

@Entity({ name: 'report' })
export class Report {
  @ObjectIdColumn()
  _id: string;

  @Column()
  userId: string;

  @Column()
  roomId: string;

  @Column()
  createAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  detail: string;

  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.PENDING,
  })
  status: ReportStatus;
}
