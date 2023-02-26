import { Request, Response, NextFunction } from 'express';

const restrictTo =
  (roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { currentUser } = req;
    if (!currentUser) {
      return res.status(401).json({ message: 'You are not logged in' });
    }
    const { role } = currentUser;
    if (!roles.includes(role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
  };

export default restrictTo;
