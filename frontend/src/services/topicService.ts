import axios from 'axios';
import { Topic } from '../types/forum';

const baseUrl = 'api/topic';

const getAllTopicsByBoardId = async (boardId: string): Promise<Topic[]> => {
  const request = await axios.get(`${baseUrl}/${boardId}`);
  return request.data;
};

const TopicService = {
  getAllTopicsByBoardId
};

export default TopicService;
