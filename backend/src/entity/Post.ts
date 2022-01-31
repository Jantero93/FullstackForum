/** TypeORM */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  postId!: number;

  @Column()
  created!: string;

  @Column()
  message!: string;

  @Column()
  votes!: number;

  @Column()
  topicRef!: string;

  @Column()
  userRef!: string;
}
