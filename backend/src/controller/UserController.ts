/** Services */
import * as UserService from '../services/userService';

/** Types */
import { Response, Request } from 'express';

export const saveOne = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const savedUser = await UserService.saveUser(username, password);

  res.send({
    id: savedUser.id,
    username: savedUser.username
  });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userFromDB = await UserService.findUser(username);

  const isUserVerified = await UserService.verifyUser(userFromDB, password);

  const token: string = isUserVerified
    ? await UserService.getToken(username, userFromDB.id)
    : 'Login failed';

  res.send({
    username: userFromDB.username,
    token: token
  });
};
