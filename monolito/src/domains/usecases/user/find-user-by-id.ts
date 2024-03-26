import { UserRepository } from '../../repositories';
import { User } from '../../entities';

export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
}

