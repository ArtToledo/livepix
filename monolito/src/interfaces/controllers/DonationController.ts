import { Request, Response } from 'express';

import { CreateDonationUseCase } from '@domains/usecases';
import { created, handleResponse, serverError } from '@interfaces/helpers';

export class DonationController {
  constructor(private createDonationUseCase: CreateDonationUseCase) {}

  async create(req: Request, res: Response) {
    try {
      const donation = await this.createDonationUseCase.execute(req.body);
      handleResponse(res, created(donation));
    } catch (error) {
      handleResponse(res, serverError(error));
    }
  }
}
