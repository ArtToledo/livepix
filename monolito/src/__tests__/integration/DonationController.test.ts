require('dotenv').config();
import request from 'supertest';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import app from '@main/app';
import { CreateDonationUseCase } from '@domains/usecases';
import { throwError } from '@tests/helpers';
import { Donation } from '@entities/Donation';
import { AuthService } from '@domains/services';

describe('Donation Controller Integration', () => {
  let token: string;

  beforeAll(async () => {
    await mongoose.connect(`${process.env.DB_TEST_MONGO_URL}`);
    token = AuthService.generateToken(faker.database.mongodbObjectId());
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /donation - should create a donation with return 201', async () => {
    const dataDonationToCreate = generateDataDonationToCreate();
    const response = await request(app)
      .post('/api/donation')
      .set('Authorization', `Bearer ${token}`)
      .send(dataDonationToCreate);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toEqual(dataDonationToCreate.name);
    expect(response.body.email).toEqual(dataDonationToCreate.email);
    expect(response.body.value).toEqual(dataDonationToCreate.value);
  });

  it('POST /donation - should return 500 when trying to add donation', async () => {
    const dataDonationToCreate = generateDataDonationToCreate();

    jest
      .spyOn(CreateDonationUseCase.prototype, 'execute')
      .mockRejectedValueOnce(throwError);

    const response = await request(app)
      .post('/api/donation')
      .set('Authorization', `Bearer ${token}`)
      .send(dataDonationToCreate);

    expect(response.status).toBe(500);
    expect(response.body.name).toEqual('ServerError');
  });
});

const generateDataDonationToCreate = (): Donation => ({
  donatorId: faker.database.mongodbObjectId(),
  name: faker.internet.displayName(),
  email: faker.internet.email(),
  value: faker.number.float(),
});
