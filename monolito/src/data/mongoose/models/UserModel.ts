import { Model } from 'mongoose';
import UserSchema, { User } from '@schemas/UserSchema';

const UserModel: Model<User> = UserSchema;

export default UserModel;
