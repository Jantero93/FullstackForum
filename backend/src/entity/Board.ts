/** TypeORM */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

/** Entities */
import { Topic } from './Topic';

/** Validation */
import { MaxLength } from 'class-validator';
@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ unique: true })
  board!: string;

  @Column()
  @MaxLength(500, {
    message: 'Description can be max 500 long'
  })
  adjective!: string;

  @OneToMany(() => Topic, (topic) => topic.board, { cascade: true })
  topics!: Topic[];
}
