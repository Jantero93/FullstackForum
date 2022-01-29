import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entity/Board';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
