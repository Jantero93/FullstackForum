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

  console.log('req.bodyfgddfgfd', req.body);
  const { username, password } = req.body;

  console.log('username', username);
  console.log('password', password);

  if ((password as string).length < 6) {
    return res.status(422).send({
      error: 'password minimum length 6'
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User();
  user.username = username;
  user.password = passwordHash;

  console.log('user mega user', user);

  res.send(await userRepository.save(user));
};
