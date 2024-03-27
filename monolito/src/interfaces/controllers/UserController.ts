import { Request, Response } from 'express';
import { CreateUserUseCase, FindUserByIdUseCase } from '@domains/usecases';
import { UserService } from '@domains/services';
import { created, handleResponse, ok, serverError } from '@interfaces/helpers';

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const passwordEncrypted = await UserService.hashPassword(
        req.body.password,
      );
      req.body.password = passwordEncrypted;

      const { _id, name, email } = await this.createUserUseCase.execute(
        req.body,
      );
      handleResponse(res, created({ _id, name, email }));
    } catch (error) {
      handleResponse(res, serverError(error));
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { _id, name, email } = await this.findUserByIdUseCase.execute(id);

      handleResponse(res, ok({ _id, name, email }));
    } catch (error) {
      handleResponse(res, serverError(error));
    }
  }
}
