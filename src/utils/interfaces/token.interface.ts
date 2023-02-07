import { ObjectId } from 'mongoose';

interface Token extends Object {
  id: ObjectId;
  expiresAt: Date;
}
export default Token;
