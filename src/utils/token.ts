import jwt from 'jsonwebtoken';
// import User from '@/resources/user/user.interface';
import Token from '@/utils/interfaces/token.interface';
import { ObjectId } from 'mongoose';

interface IUser {
  _id: ObjectId;
}

export const createToken = (user: IUser): string => {
  const expiresIn = 60 * 60 * 24; // expire in 1 day
  const secret = process.env.JWT_SECRET as jwt.Secret;
  const dataStoredInToken: Token = {
    id: user._id,
    expiresAt: new Date(Date.now() + expiresIn * 1000),
  };
  return jwt.sign(dataStoredInToken, secret, {
    expiresIn,
    algorithm: 'HS256',
  });
};

export const verifyToken = async (token: string): Promise<jwt.VerifyErrors | Token> => {
  const secret = process.env.JWT_SECRET as jwt.Secret;
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as Token);
    });
  });
};

export default { createToken, verifyToken };
