import { Router } from 'express';

import { MongoDonationRepository } from '@data/mongoose/repositories';
import { CreateDonationUseCase } from '@domains/usecases';
import { DonationController } from '@interfaces/controllers';
import { authMiddleware } from '@adapters/express/middlewares';

const donationRoutes = Router();
const donationRepository = new MongoDonationRepository();

const createDonationUseCase = new CreateDonationUseCase(donationRepository);

const donationController = new DonationController(createDonationUseCase);

donationRoutes.use(authMiddleware);
donationRoutes.post('', (req, res) => donationController.create(req, res));

export { donationRoutes };
