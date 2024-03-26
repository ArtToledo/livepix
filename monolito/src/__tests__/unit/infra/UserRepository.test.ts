require('dotenv').config();
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { MongoUserRepository } from '@data/mongoose/repositories';
import { User } from '@domains/entities';
import UserModel from '@models/UserModel';

describe('MongoDB User Repository', () => {
  let userRepository: MongoUserRepository;

  beforeAll(async () => {
    await mongoose.connect(`${process.env.DB_TEST_MONGO_URL}`);
    userRepository = new MongoUserRepository();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  it('should create a user with the data passed', async () => {
    const user: User = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const userCreated = await userRepository.create(user);
    const foundUser = await UserModel.findById(userCreated._id);

    expect(foundUser._id).toBeTruthy();
    expect(foundUser.name).toEqual(user.name);
    expect(foundUser.email).toEqual(user.email);
    expect(foundUser.password).toEqual(user.password);
  });

  it('should find user by id', async () => {
    const user: User = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const userCreated = await UserModel.create(user);
    const foundUser = await userRepository.findById(userCreated._id);

    expect(foundUser._id).toBeTruthy();
    expect(foundUser.name).toEqual(user.name);
    expect(foundUser.email).toEqual(user.email);
    expect(foundUser.password).toEqual(user.password);
  });

  it('should find user by Email', async () => {
    const user: User = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await UserModel.create(user);
    const foundUser = await userRepository.findByEmail(user.email);

    expect(foundUser._id).toBeTruthy();
    expect(foundUser.name).toEqual(user.name);
    expect(foundUser.email).toEqual(user.email);
    expect(foundUser.password).toEqual(user.password);
  });
});
