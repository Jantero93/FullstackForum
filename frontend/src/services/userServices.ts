import axios from 'axios';
import { User } from '../types/forum';

const baseUrl = '/api/user';

const loginUser = async (username: string, password: string): Promise<User> => {
  const request = await axios.post(`${baseUrl}/login`, {
    username,
    password
  });
  return request.data;
};

const postUser = async (username: string, password: string): Promise<User> => {
  const request = await axios.post(baseUrl, {
    username,
    password
  });
  return request.data;
};

const UserService = {
  loginUser,
  postUser
};

export default UserService;
