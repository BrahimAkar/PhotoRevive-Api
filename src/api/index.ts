import { Router } from 'express';
import simple from './routes/simple';

// guaranteed to get dependencies
export default (): Router => {
  const app = Router();
  simple(app);

  return app;
};
