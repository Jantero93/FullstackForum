/** Repository */
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/userRepository';

/** Types */
import { User } from '../entity/User';
import { Response, Request } from 'express';

/** bcrypt */
import bcrypt from 'bcryptjs';

export const saveOne = async (req: Request, res: Response) => {
  const userRepository = getCustomRepository(UserRepository);

  const { username, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User();
  user.username = username;
  user.password = passwordHash;

  res.send(await userRepository.save(user));
};
