import axios from 'axios';

import { Board } from '../types/forum';

const baseUrl = '/boards';

const getAllBoards = async (): Promise<Board[]> => {
  const request = await axios.get(baseUrl);
  return request.data.boards;
};

const BoardService = {
  getAllBoards
};

export default BoardService;
