import axios from 'axios';

const baseUrl = 'api/topic';

const getAllTopicsByBoardId = async (boardId: string): Promise<any> => {
  const request = await axios.get(`${baseUrl}/${boardId}`);
  console.log('request.data', request.data);
  return request.data;
};

const TopicService = {
  getAllTopicsByBoardId
};

export default TopicService;
