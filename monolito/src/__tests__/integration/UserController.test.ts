require('dotenv').config();
import request from 'supertest';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import app from '@main/app';

describe('User Controller Integration', () => {
  beforeAll(async () => {
    await mongoose.connect(`${process.env.DB_TEST_MONGO_URL}`);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /user - should create a user with return 201', async () => {
    const name = faker.internet.displayName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const response = await request(app).post('/api/user').send({
      name,
      email,
      password,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toEqual(name);
    expect(response.body.email).toEqual(email);
  });
});
