/** Repository */
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/userRepository';

import { User } from '../entity/User';

import { Response, Request } from 'express';

export const deleteOne = async (req: Request, res: Response) => {
  const userRepository = getCustomRepository(UserRepository);
  res.send(await userRepository.delete(req.params.id));
};

export const getAll = async (_req: Request, res: Response) => {
  const userRepository = getCustomRepository(UserRepository);
  res.send(await userRepository.find());
};

export const replace = async (req: Request, res: Response) => {
  const userRepository = getCustomRepository(UserRepository);

  //TODO: Check validation

  const oldUser = await userRepository.findOne(req.params.id);

  if (!oldUser) {
    res.send('Error not found');
    return;
  }

  res.send('kesken');
};

export const saveOne = async (_req: Request, res: Response) => {
  const userRepository = getCustomRepository(UserRepository);

  //TODO: Check validation
  const user = new User();

  res.send(await userRepository.save(user));
};
