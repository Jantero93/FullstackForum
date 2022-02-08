/** TypeORM */
import { Entity, JoinTable } from 'typeorm';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/** Entities */
import { Topic } from './Topic';

/** Validation */
import { Length } from 'class-validator';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /** Board name */
  @Column({ unique: true, nullable: false })
  @Length(1, 200)
  board!: string;

  /** Description of board, will be showed in forums */
  @Column()
  @Length(1, 1000, {
    message: 'Description can be max 500 long'
  })
  adjective!: string;

  /** Topics in specific board */
  @OneToMany(() => Topic, (topic) => topic.board)
  @JoinTable()
  topics!: Topic[];
}
