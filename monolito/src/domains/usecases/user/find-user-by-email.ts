import { UserRepository } from '../../repositories';
import { User } from '../../entities';

export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
}

