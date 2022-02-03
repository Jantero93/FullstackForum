/** Services */
import * as UserService from '../services/userService';

/** Types */
import { Response, Request } from 'express';

export const saveOne = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  res.send(await UserService.saveUser(username, password));
};
