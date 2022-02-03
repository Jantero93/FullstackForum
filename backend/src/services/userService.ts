/** Repository */
import { UserRepository } from '../repositories/userRepository';
import { getCustomRepository } from 'typeorm';

/** Entity */
import { User } from '../entity/User';

/** Utils */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const findUser = async (username: string): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);
  return await userRepository.findUserByUserName(username);
};

export const getToken = (username: string, id: string): string => {
  const userForToken = {
    username,
    id
  };
  /** 60 s * 60 s = 1 h */
  const expirationTime = { expiresIn: 60 * 60 };

  return jwt.sign(userForToken, config.TOKEN_SECRET, expirationTime);
};

export const saveUser = async (
  username: string,
  password: string
): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User();
  user.username = username;
  user.passwordHash = passwordHash;

  return await userRepository.save(user);
};

export const verifyUser = async (
  userFromDB: User,
  password: string
): Promise<boolean> => {
  const passwordCorrect: boolean =
    userFromDB === null
      ? false
      : await bcrypt.compare(password, userFromDB.passwordHash);

  /** True if user exists and password is correct */
  return userFromDB && passwordCorrect;
};
