import { Request, Response } from 'express';

import { AuthService, UserService } from '@domains/services';
import { FindUserByEmailUseCase } from '@domains/usecases';
import {
  handleResponse,
  ok,
  serverError,
  unauthorized,
} from '@interfaces/helpers';

export class AuthController {
  constructor(private findUserByEmailUseCase: FindUserByEmailUseCase) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await this.findUserByEmailUseCase.execute(email);
      const isPasswordValid = await UserService.comparePasswords(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        handleResponse(res, unauthorized());
        return;
      }

      const token = AuthService.generateToken(user._id);
      handleResponse(res, ok({ token }));
    } catch (error) {
      handleResponse(res, serverError(error));
    }
  }
}
