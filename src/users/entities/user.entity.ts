import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity({ name: 'users' })
export class Users {
  @ObjectIdColumn()
  _id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  studentId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole
}
