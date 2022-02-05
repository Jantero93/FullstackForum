import axios from 'axios';

import { Board } from '../types/forum';

const baseUrl = '/api/board';

const getAllBoards = async (): Promise<Board[]> => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const BoardService = {
  getAllBoards
};

export default BoardService;
