import axios from 'axios';
import { User } from '../types/forum';

const baseUrl = '/api/user';

const postUser = async (username: string, password: string): Promise<User> => {
  const request = await axios.post(baseUrl, {
    username: username,
    password: password
  });
  return request.data;
};

const UserService = {
  postUser
};

export default UserService;
