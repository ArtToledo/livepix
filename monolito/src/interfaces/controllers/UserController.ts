import { Request, Response } from 'express';
import { CreateUserUseCase } from '@domains/usecases';
import { UserService } from '@domains/services';

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const passwordEncrypted = await UserService.hashPassword(
        req.body.password,
      );
      req.body.password = passwordEncrypted;

      const { _id, name, email } = await this.createUserUseCase.execute(
        req.body,
      );
      res.status(201).json({ _id, name, email });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
