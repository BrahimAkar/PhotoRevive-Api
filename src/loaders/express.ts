/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express, { Application, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { OpticMiddleware } from '@useoptic/express-middleware';
import routes from '@/api';
import config from '@/config';
import Controller from '../utils/interfaces/controller.interface';

export class App {
  public port: number;
  public app: Application;

  // constructor
  constructor(controllers: Controller[], port: number, app: Application) {
    this.port = port;
    this.app = app;
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeNotFoundHandling();
  }

  private initializeNotFoundHandling(): void {
    this.app.use((req: express.Request, res: express.Response, next: NextFunction) => {
      const error = new Error(`Not found - ${req.originalUrl}, Please check the API Documentation.`);
      res.status(404);
      next(error);
    });
  }

  private initializeErrorHandling(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
      console.error(err);
      res.status(500).json({
        message: err.message,
      });
    });
  }

  // initialize database connection
  private initializeMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(cors());

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    this.app.enable('trust proxy');
    // API Documentation
    this.app.use(
      OpticMiddleware({
        enabled: process.env.NODE_ENV !== 'production',
      }),
    );
  }
  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.app.use(config.api.prefix, controller.router);
    });
  }
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  // app.use(require('method-override')());

  // Transforms the raw string of req.body into json
  app.use(express.json());
  // Load API routes
  app.use(config.api.prefix, routes());
  // Experimental: Initialize Controllers

  // API Documentation
  app.use(
    OpticMiddleware({
      enabled: process.env.NODE_ENV !== 'production',
    }),
  );

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err, req, res, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};

// export default App;
