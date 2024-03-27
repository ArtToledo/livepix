require('dotenv').config();
import request from 'supertest';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import app from '@main/app';
import UserModel from '@models/UserModel';
import { CreateUserUseCase, FindUserByIdUseCase } from '@domains/usecases';
import { throwError } from '@tests/helpers';

describe('User Controller Integration', () => {
  beforeAll(async () => {
    await mongoose.connect(`${process.env.DB_TEST_MONGO_URL}`);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /user - should create a user with return 201', async () => {
    const dataUserToCreate = generateDataUserToCreate();
    const response = await request(app)
      .post('/api/user')
      .send(dataUserToCreate);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toEqual(dataUserToCreate.name);
    expect(response.body.email).toEqual(dataUserToCreate.email);
  });

  it('GET /:id - should get a user passing id as a parameter return 200', async () => {
    const dataUserToCreate = generateDataUserToCreate();
    const { body: user } = await request(app)
      .post('/api/user')
      .send(dataUserToCreate);

    const { body: dataToken } = await request(app).post('/api/auth').send({
      email: dataUserToCreate.email,
      password: dataUserToCreate.password,
    });

    const response = await request(app)
      .get(`/api/user/${user._id}`)
      .set('Authorization', `Bearer ${dataToken.token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(user.name);
    expect(response.body.email).toEqual(user.email);
  });

  it('POST /user - should return 500 when trying to add user', async () => {
    const dataUserToCreate = generateDataUserToCreate();

    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockRejectedValueOnce(throwError);

    const response = await request(app)
      .post('/api/user')
      .send(dataUserToCreate);

    expect(response.status).toBe(500);
    expect(response.body.name).toEqual('ServerError');
  });

  it('GET /:id - should return 500 when trying get user passing id as a parameter', async () => {
    const dataUserToCreate = generateDataUserToCreate();

    const { body: user } = await request(app)
      .post('/api/user')
      .send(dataUserToCreate);

    const { body: dataToken } = await request(app).post('/api/auth').send({
      email: dataUserToCreate.email,
      password: dataUserToCreate.password,
    });

    jest
      .spyOn(FindUserByIdUseCase.prototype, 'execute')
      .mockRejectedValueOnce(throwError);

    const response = await request(app)
      .get(`/api/user/${user._id}`)
      .set('Authorization', `Bearer ${dataToken.token}`);

    expect(response.status).toBe(500);
    expect(response.body.name).toEqual('ServerError');
  });
});

const generateDataUserToCreate = () => ({
  name: faker.internet.displayName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});
