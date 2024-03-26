import { User } from '@entities/User';

export interface UserRepository {
  create(params: User): Promise<User>;
}
