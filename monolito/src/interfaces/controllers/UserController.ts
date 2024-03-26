import { Request, Response } from 'express';
import { CreateUserUseCase } from '@domains/usecases';
import { UserService } from '@domains/services';
import { HttpResponse } from '@interfaces/protocols';
import { created, serverError } from '@interfaces/helpers';

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async create(req: Request, res: Response) {
    try {
      const passwordEncrypted = await UserService.hashPassword(
        req.body.password,
      );
      req.body.password = passwordEncrypted;

      const { _id, name, email } = await this.createUserUseCase.execute(
        req.body,
      );

      await this.handleResponse(res, created({ _id, name, email }));
    } catch (error) {
      await this.handleResponse(res, serverError(error));
    }
  }

  async handleResponse(res: Response, result: HttpResponse) {
    res.status(result.statusCode).json(result.body);
  }
}
