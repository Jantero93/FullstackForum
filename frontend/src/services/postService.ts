import axios from 'axios';

import { Post } from '../types/forum';

const baseUrl = '/api/post';

const getPostsByTopicId = async (topicId: string): Promise<Post[]> => {
  const request = await axios.get(`${baseUrl}/${topicId}`);
  return request.data;
}

const postNewPost = async (post: Post): Promise<Post> => {
  const request = await axios.post(`${baseUrl}/`, post);
  return request.data;
}

const PostService = {
  getPostsByTopicId,
  postNewPost
};

export default PostService


