import axios from 'axios';

import { Board } from '../types/forum';

const baseUrl = '/api/board';

const getAllBoards = async (): Promise<Board[]> => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const deleteBoard = async (boardId: string): Promise<void> =>
  await axios.delete(`${baseUrl}/${boardId}`);

const BoardService = {
  deleteBoard,
  getAllBoards
};

export default BoardService;
