/* eslint-disable @typescript-eslint/no-unused-vars */
// this controller is responsible for handling requests to /api/v3/simple

import { Request, Response, Router, NextFunction } from 'express';
import IController from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/api/middlewares/validation.middleware';
import { Logger } from 'winston';
import { Container } from 'typedi/Container';
import FixerService from './fixer.service';
import validate from './fixer.validation';
import checkRateLimit from '@/api/middlewares/rateLimiter';

class FixerController implements IController {
  public path = '/images/fix';
  public router: Router = Router();
  fixerService: FixerService = new FixerService(Container.get('logger') as Logger);
  //

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.post(this.path, checkRateLimit, validationMiddleware(validate.fixOldImage), this.fixAnImage);
    this.router.get(this.path, this.getFixer);
  }

  private getFixer = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const logger: Logger = Container.get('logger');
      logger.info('Calling Fixer Get endpoint');
      //   const res = await this.fixerService.getFixer();
      response.json({ message: 'res' });
    } catch (error: unknown) {
      next(new HttpException(500, error.toString()));
    }
  };
  private fixAnImage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const logger: Logger = Container.get('logger');
      logger.info('Calling FixAnImage Post endpoint');
      const res = await this.fixerService.fixAnImage(request.body.oldImageURL);
      if (res.imageURL != null) {
        response.json(res);
      } else {
        response.json({ message: 'No Image Found' });
      }
    } catch (error: unknown) {
      next(new HttpException(500, error.toString()));
    }
  };
}

export default FixerController;
