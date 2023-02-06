import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';

const route = Router();

export default (app: Router): void => {
  app.use('/simple', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Simple endpoint');
    try {
      return res.status(201).json({ msg: 'Simple endpoint' });
    } catch (e) {
      logger.error('🔥 error: %o', e.message);
      return next(e);
    }
  });
};
