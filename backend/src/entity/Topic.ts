/** TypeORM */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  topicId!: number;

  @Column()
  created!: string;

  @Column()
  topic!: string;

  @Column()
  boardRef!: string;
}
