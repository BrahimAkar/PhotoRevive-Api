/* eslint-disable @typescript-eslint/no-unused-vars */
// this controller is responsible for handling requests to /api/v3/simple

import { Request, Response, Router, NextFunction } from 'express';
import IController from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SimpleService from './simple.service';
import validationMiddleware from '@/api/middlewares/validation.middleware';
import validate from './simple.validation';
import { Logger } from 'winston';
import { Container } from 'typedi/Container';

class SimpleController implements IController {
  public path = '/simple';
  public router: Router = Router();
  public SimpleService = new SimpleService();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get(this.path, validationMiddleware(validate.get), this.getSimple);
  }
  private getSimple = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      //   this.logger.info('Calling getSimple endpoint');
      const logger: Logger = Container.get('logger');
      logger.info('Calling getSimple endpoint');
      const res = await this.SimpleService.getSimple();
      response.json({ message: res });
    } catch (error: unknown) {
      next(new HttpException(500, error.toString()));
    }
  };
  private createSimple = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, body } = request.body;
      const simple = await this.SimpleService.getSimple();
      response.send(simple);
    } catch (error: unknown) {
      next(new HttpException(500, error.toString()));
    }
  };
}

export default SimpleController;
