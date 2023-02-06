/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';

export default {
  test: (req: Request, res: Response, next: NextFunction) => {
    console.log('test middleware');
    next();
  },
};
