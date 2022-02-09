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
import ResponseError from '../utils/ApplicationError';
import { validate } from 'class-validator';

export const deleteOne = async (userId: string): Promise<void> => {
  logger.printStack('User Service', deleteOne.name);
  await getCustomRepository(UserRepository).delete(userId);
};

/**
 * Throw error if entity not found
 * @param userId
 * @returns User Entity
 */
export const findOne = async (userId: string): Promise<User> => {
  logger.printStack('User Service', findOne.name);
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne(userId);

  if (!user) throw new ResponseError('No user found', 'ENTITY_NOT_FOUND');
  else return user;
};

export const findAll = async (): Promise<User[]> => {
  logger.printStack('User Service', findAll.name);
  const userRepository = getCustomRepository(UserRepository);
  return await userRepository.find();
};

/**
 * Throws error if not found
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
 * Throws error if save fails
 * @param username Username to save
 * @param password Password to save
 * @returns Saved User Entity
 */
export const saveUser = async (
  paramUsername: string,
  paramPassword: string
): Promise<User> => {
  logger.printStack('User Service', saveUser.name);

  const userRepository = getCustomRepository(UserRepository);

  const userFromDB = await userRepository.findOne({
    where: { username: paramUsername }
  });

  if (userFromDB) {
    throw new ResponseError('Username already taken', 'CONFLICT');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(paramPassword, saltRounds);

  const user = new User();
  user.username = paramUsername;
  user.passwordHash = passwordHash;

  const errors = await validate(user);

  if (errors.length)
    throw new ResponseError(
      'Username and/or password do not meet requirements',
      'INVALID_REQUEST_BODY'
    );
  else return await userRepository.save(user);
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

  return await bcrypt.compare(password, userFromDB.passwordHash);
};
