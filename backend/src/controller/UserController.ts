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

  //! If user not verified throw error
  const isUserVerified = await UserService.verifyUser(userFromDB, password);

  const token: string | null = isUserVerified
    ? await UserService.getToken(userFromDB.username, userFromDB.id)
    : null;

  !token && res.sendStatus(401);

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 60 * 60 * 1000)
  });

  res.send({
    message: 'Logged in successfully'
  });
};
