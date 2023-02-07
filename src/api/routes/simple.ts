import { Router, Request, Response, NextFunction } from 'express';
import { default as Redis } from 'ioredis';

import { Container } from 'typedi';
import { Logger } from 'winston';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router): void => {
  app.use('/simple', route);

  route.get('/', middlewares.rateLimiter, async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    const redis: Redis = Container.get('redis');

    const key = 'brahim';
    const value = new Date().toISOString();

    // const getVal = await redis.get(key);

    logger.debug('Calling Simple endpoint');
    try {
      return res.status(201).json({ msg: 'Hello World!' });
    } catch (e) {
      logger.error('🔥 error: %o', e.message);
      return next(e);
    }
  });
};
