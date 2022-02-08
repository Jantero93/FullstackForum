import axios from 'axios';

import { Board } from '../types/forum';

const baseUrl = '/api/board';

const deleteBoard = async (boardId: string): Promise<void> =>
  await axios.delete(`${baseUrl}/${boardId}`);

const getAllBoards = async (): Promise<Board[]> => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const postBoard = async (board: Board): Promise<Board> => {
  const request = await axios.post(baseUrl, board);
  return request.data;
};

const BoardService = {
  deleteBoard,
  getAllBoards,
  postBoard
};

export default BoardService;
