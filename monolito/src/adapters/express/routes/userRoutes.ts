import { Router } from 'express';
import { UserController } from '@interfaces/controllers';
import { CreateUserUseCase } from '@domains/usecases';
import { MongoUserRepository } from '@data/mongoose/repositories';

const userRoutes = Router();

const userRepository = new MongoUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

userRoutes.post('', (req, res) => userController.create(req, res));

export default userRoutes;
