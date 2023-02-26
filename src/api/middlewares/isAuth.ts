import { Container } from 'typedi';
import firesbase from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 * But it could come in a query parameter with the name that you want like
 * GET https://my-bulletproof-api.com/stats?apiKey=${JWT}
 * Luckily this API follow _common sense_ ergo a _good design_ and don't allow that ugly stuff
 */
const getTokenFromHeader = (req: Request) => {
  /**
   * @TODO Edge and Internet Explorer do some weird things with the headers
   * So I believe that this should handle more 'edge' cases ;)
   */
  // 1.) Getting token and check if it's there
  let token: string | undefined;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Extract token
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    return null;
  }
  if (!token) {
    return null;
  }
  return token;
};

// 2.) Verifying firebase token
const isValidFirebaseToken = async (req: Request, res: Response, next: NextFunction): Promise<boolean | void> => {
  try {
    // get the firebase admin instance from Dependency Injector
    const firebase: firesbase.app.App = Container.get('firebase');
    const token = getTokenFromHeader(req);
    const decodedToken = await firebase.auth().verifyIdToken(token);
    if (!decodedToken) {
      return next(new Error('Invalid token'));
    }
    req.uid = decodedToken.uid;
    next();
  } catch (e) {
    return next(new Error('Invalid token'));
  }
};

export default isValidFirebaseToken;
