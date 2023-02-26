import { Router, Request, Response, NextFunction } from 'express';

import { Container } from 'typedi';
import { Logger } from 'winston';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router): void => {
  app.use('/simple', route);

  route.get(
    '/',
    middlewares.restrictTo(['admin']),
    middlewares.rateLimiter,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Simple endpoint');
      try {
        return res.status(201).json({ msg: 'Hello World!' });
      } catch (e) {
        logger.error('🔥 error: %o', e.message);
        return next(e);
      }
    },
  );
};
