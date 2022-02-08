/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      token: string | null;
      userId: string;
      username: string;
      admin: boolean;
    }
  }
}
