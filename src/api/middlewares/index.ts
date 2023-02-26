/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import rateLimiter from './rateLimiter';
import restrictTo from './restrict';
import isValidFirebaseToken from '../middlewares/isAuth';

export default {
  test: (req: Request, res: Response, next: NextFunction) => {
    console.log('test middleware');
    next();
  },
  rateLimiter,
  restrictTo,
  isValidFirebaseToken,
};
