import { Router } from 'express';

import { AuthController } from '@interfaces/controllers/AuthController';
import { MongoUserRepository } from '@data/mongoose/repositories';
import { FindUserByEmailUseCase } from '@domains/usecases';

const authRoutes = Router();
const userRepository = new MongoUserRepository();
const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
const authController = new AuthController(findUserByEmailUseCase);

authRoutes.post('', (req, res) => authController.login(req, res));

export { authRoutes };
