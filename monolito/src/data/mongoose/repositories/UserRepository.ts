import UserModel from '@models/UserModel';
import { User } from '@domains/entities/User';
import { UserRepository } from '@domains/repositories';

export class MongoUserRepository implements UserRepository {
  async create(params: User): Promise<User> {
    return UserModel.create(params);
  }
}
