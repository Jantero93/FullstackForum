/** Services */
import * as UserService from '../services/userService';

/** Types */
import { Response, Request } from 'express';

export const saveOne = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  res.send(await UserService.saveUser(username, password));
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userFromDB = await UserService.findUser(username);

  const userVerified = await UserService.verifyUser(userFromDB, password);

  const token: string = userVerified
    ? await UserService.getToken(username, userFromDB.id)
    : 'Login failed';

  res.send({
    username: userFromDB.username,
    token: token
  });
};
