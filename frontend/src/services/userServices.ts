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

const logOutUser = async (): Promise<void> =>
  await axios.post(`${baseUrl}/logout`);

const postUser = async (username: string, password: string): Promise<User> => {
  const newUser = { username: username, password: password };
  const request = await axios.post(baseUrl, newUser, { withCredentials: true });
  return request.data;
};

const UserService = {
  loginUser,
  logOutUser,
  postUser
};

export default UserService;
