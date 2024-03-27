import UserModel from '@models/UserModel';
import { User } from '@domains/entities/User';
import { UserRepository } from '@domains/repositories';

export class MongoUserRepository implements UserRepository {
  async create(params: User): Promise<User> {
    return UserModel.create(params);
  }

  async findById(id: string): Promise<User | null> {
    return UserModel.findById(id).lean().exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).lean().exec();
  }
}
