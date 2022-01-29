import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  boardId!: number;

  @Column()
  board!: string;

  @Column()
  adjective!: string;
}
