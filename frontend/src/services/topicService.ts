import axios from 'axios';
import { Topic } from '../types/forum';

const baseUrl = '/api/topic';

const deleteTopic = async (topicId: string): Promise<void> =>
  await axios.delete(`${baseUrl}/${topicId}`);

const getAllTopicsByBoardName = async (boardName: string): Promise<Topic[]> => {
  const request = await axios.get(`${baseUrl}/${boardName}`);
  return request.data;
};

const postTopic = async (topic: Topic): Promise<Topic> => {
  const request = await axios.post(`${baseUrl}`, topic);
  return request.data;
};

const TopicService = {
  deleteTopic,
  getAllTopicsByBoardName,
  postTopic
};

export default TopicService;
