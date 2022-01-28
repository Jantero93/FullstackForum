/** Repository */
import { getRepository } from 'typeorm';

/** Entity */
import { User } from '../entity/User';

/** Types */
import { Response, Request } from 'express';

export const getAll = async (_req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();

  res.send(users);
};

export const saveOne = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);

  const { age, firstName, lastName } = req.body;

  //TODO: Check validation
  const user = new User();
  user.age = age;
  user.firstName = firstName;
  user.lastName = lastName;

  res.send(await userRepository.save(user));
};
