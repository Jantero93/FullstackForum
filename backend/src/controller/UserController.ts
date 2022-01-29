/** Repository */
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/userRepository';

/** Entity */
import { User } from '../entity/User';

/** Types */
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
  const { age, firstName, lasName } = req.body;

  const oldUser = await userRepository.findOne(req.params.id);

  if (!oldUser) {
    res.send('Error not found');
    return;
  }

  oldUser.age = age;
  oldUser.firstName = firstName;
  oldUser.lastName = lasName;
  res.send(await userRepository.save(oldUser as User));
};

export const saveOne = async (req: Request, res: Response) => {
  const userRepository = getCustomRepository(UserRepository);

  const { age, firstName, lastName } = req.body;

  //TODO: Check validation
  const user = new User();
  user.age = age;
  user.firstName = firstName;
  user.lastName = lastName;

  res.send(await userRepository.save(user));
};
