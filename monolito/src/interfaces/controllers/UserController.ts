import { Request, Response } from 'express';
import { CreateUserUseCase, FindUserByIdUseCase } from '@domains/usecases';
import { UserService } from '@domains/services';
import { HttpResponse } from '@interfaces/protocols';
import { created, ok, serverError } from '@interfaces/helpers';

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { _id, name, email } = await this.createUserUseCase.execute(
        req.body,
      );
      await this.handleResponse(res, created({ _id, name, email }));
    } catch (error) {
      await this.handleResponse(res, serverError(error));
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { _id, name, email } = await this.findUserByIdUseCase.execute(id);

      await this.handleResponse(res, ok({ _id, name, email }));
    } catch (error) {
      await this.handleResponse(res, serverError(error));
    }
  }

  async handleResponse(res: Response, result: HttpResponse) {
    res.status(result.statusCode).json(result.body);
  }
}
