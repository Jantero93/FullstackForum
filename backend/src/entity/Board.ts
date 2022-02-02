/** TypeORM */
import { Entity } from 'typeorm';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/** Entities */
import { Topic } from './Topic';

/** Validation */
import { MaxLength } from 'class-validator';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  /** Board name */
  @Column({ unique: true })
  @MaxLength(200)
  board!: string;

  /** Description of board, will be showed in forums */
  @Column()
  @MaxLength(1000, {
    message: 'Description can be max 500 long'
  })
  adjective!: string;

  /** Topics in specific board */
  @OneToMany(() => Topic, (topic) => topic.board)
  topics!: Topic[];
}
