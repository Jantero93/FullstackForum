import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/** Entities */
//import { Post } from './Post';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

  // @Column()
  // posts!: Post[];
}
