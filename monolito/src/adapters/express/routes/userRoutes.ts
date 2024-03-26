import { Router } from 'express';
import { UserController } from '@interfaces/controllers';
import { CreateUserUseCase, FindUserByIdUseCase } from '@domains/usecases';
import { MongoUserRepository } from '@data/mongoose/repositories';

const userRoutes = Router();
const userRepository = new MongoUserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);

const userController = new UserController(
  createUserUseCase,
  findUserByIdUseCase,
);

userRoutes.post('', (req, res) => userController.create(req, res));
userRoutes.get('/:id', (req, res) => userController.findById(req, res));

export { userRoutes };
