import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  boardId!: number;

  @Column()
  board!: string;

  @Column()
  adjective!: string;
}
