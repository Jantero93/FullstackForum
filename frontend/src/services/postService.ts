import axios from 'axios';

import { Post } from '../types/forum';

const baseUrl = '/posts';

const getPostsByBoardId = async (boardId: string): Promise<any> => {
  // const request = await axios.get(`${baseUrl}/${boardId}`);
  const request = await axios.get(baseUrl);
  return request.data;
};

const PostService = {
  getPostsByBoardId
};

export default PostService;
