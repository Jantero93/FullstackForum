/** Repository */
import { UserRepository } from '../repositories/userRepository';
import { getCustomRepository } from 'typeorm';

/** Entity */
import { User } from '../entity/User';

/** Utils */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import logger from '../utils/logger';

export const deleteOne = async (userId: string): Promise<void> => {
  logger.printStack('User Service', deleteOne.name);
  await getCustomRepository(UserRepository).delete(userId);
};

export const findOne = async (userId: string): Promise<User> => {
  logger.printStack('User Service', findOne.name);
  const userRepository = getCustomRepository(UserRepository);
  return (await userRepository.findOne(userId)) as User;
};

export const findAll = async (): Promise<User[]> => {
  logger.printStack('User Service', findAll.name);
  const userRepository = getCustomRepository(UserRepository);
  const data = await userRepository.find();
  logger.responseDB(data);
  return data;
};

/**
 * ! No error handling
 * @param username username to find from DB
 * @returns User Entity
 */
export const findUserByUsername = async (username: string): Promise<User> => {
  logger.printStack('User Service', findUserByUsername.name);
  const userRepository = getCustomRepository(UserRepository);
  return await userRepository.findUserByUsername(username);
};

/**
 * Generates token
 */
export const getToken = (username: string, id: string): string => {
  logger.printStack('User Service', getToken.name);
  const userForToken = {
    username,
    id
  };

  return jwt.sign(userForToken, config.TOKEN_SECRET, {
    expiresIn: '9999 years'
  });
};

/**
 * Save user in DB
 * @param username Username to save
 * @param password Password to save
 * @returns Saved User Entity
 */
export const saveUser = async (
  username: string,
  password: string
): Promise<User> => {
  logger.printStack('User Service', saveUser.name);
  const userRepository = getCustomRepository(UserRepository);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User();
  user.username = username;
  user.passwordHash = passwordHash;

  return await userRepository.save(user);
};

/**
 * Verify login
 * @param userFromDB Fetched user from DB
 * @param password password to compare to with DB password
 * @returns true/false based on is password correct
 */
export const verifyUser = async (
  userFromDB: User,
  password: string
): Promise<boolean> => {
  logger.printStack('User Service', verifyUser.name);
  const passwordCorrect: boolean =
    userFromDB === undefined
      ? false
      : await bcrypt.compare(password, userFromDB.passwordHash);

  /** True if user exists and password is correct */
  return userFromDB && passwordCorrect;
};
