import { Document, Model } from 'mongoose';
import IUser from '../../utils/interfaces/user.interface';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
      uid: string;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
  }
}
