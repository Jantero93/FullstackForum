/** TypeORM */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

/** Entities */
import { Post } from './Post';
import { Topic } from './Topic';

/** Class validation */
import { Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  @Length(3, 20, {
    message: 'Username length must be 3 - 20'
  })
  username!: string;

  @Column()
  @Length(6, 30, {
    message: 'Password length must be at least 6 characters'
  })
  password!: string;

  @OneToMany(() => Post, (post) => post.user, { onDelete: 'NO ACTION' })
  posts!: Post[];

  @OneToMany(() => Topic, (topic) => topic.user, { onDelete: 'NO ACTION' })
  topics!: Topic[];
}
