import axios from 'axios';

import { Topic } from '../types/forum';

const baseUrl = '/topics';

const getAllTopicsByBoardId = async (boardId: string): Promise<any> => {
  //const request = await axios.get(`${baseUrl}/${boardId}`);
  const request = await axios.get(baseUrl);
  return request.data;
};

const TopicService = {
  getAllTopicsByBoardId
};

export default TopicService;
