require('dotenv').config();
import request from 'supertest';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import app from '@main/app';
import UserModel from '@models/UserModel';
import { throwError } from '@tests/helpers';
import { FindUserByEmailUseCase } from '@domains/usecases';

describe('Auth Controller Integration', () => {
  beforeAll(async () => {
    await mongoose.connect(`${process.env.DB_TEST_MONGO_URL}`);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /auth - should return token when authenticating', async () => {
    const dataUserToCreate = generateDataUserToCreate();
    await request(app).post('/api/user').send(dataUserToCreate);

    const response = await request(app).post('/api/auth').send({
      email: dataUserToCreate.email,
      password: dataUserToCreate.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('POST /auth - should return 500 when trying to authenticating', async () => {
    const dataUserToCreate = generateDataUserToCreate();

    jest
      .spyOn(FindUserByEmailUseCase.prototype, 'execute')
      .mockRejectedValueOnce(throwError);

    const response = await request(app).post('/api/auth').send({
      email: dataUserToCreate.email,
      password: dataUserToCreate.password,
    });

    expect(response.status).toBe(500);
    expect(response.body.name).toEqual('ServerError');
  });

  it('POST /auth - should return 401 when trying to authenticating with invalid credentials', async () => {
    const dataUserToCreate = generateDataUserToCreate();
    await request(app).post('/api/user').send(dataUserToCreate);

    const response = await request(app).post('/api/auth').send({
      email: dataUserToCreate.email,
      password: faker.internet.password(),
    });

    expect(response.status).toBe(401);
    expect(response.body.name).toEqual('UnauthorizedError');
  });
});

const generateDataUserToCreate = () => ({
  name: faker.internet.displayName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});
