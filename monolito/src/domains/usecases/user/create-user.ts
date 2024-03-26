import { UserRepository } from '@domains/repositories';
import { User } from '@domains/entities';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(params: User): Promise<User> {
    return this.userRepository.create(params);
  }
}
