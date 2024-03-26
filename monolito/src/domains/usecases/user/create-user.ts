import { UserRepository } from '@domains/repositories';
import { User } from '@domains/entities';
import { UserService } from '@domains/services';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(params: User): Promise<User> {
    const passwordEncrypted = await UserService.hashPassword(params.password);
    params.password = passwordEncrypted;

    return this.userRepository.create(params);
  }
}
