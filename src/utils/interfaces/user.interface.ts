import { ObjectId } from 'mongoose';

interface IUser extends Object {
  id: ObjectId;
  email: string;
  expiresAt: Date;
  role: string;
}
export default IUser;
