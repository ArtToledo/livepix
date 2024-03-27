import { User } from '@entities/User';

export interface UserRepository {
  create(params: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User>;
}
