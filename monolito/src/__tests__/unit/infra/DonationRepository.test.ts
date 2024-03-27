require('dotenv').config();
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { MongoDonationRepository } from '@data/mongoose/repositories';
import DonationModel from '@models/DonationModel';
import { Donation } from '@entities/Donation';

describe('MongoDB Donation Repository', () => {
  let donationRepository: MongoDonationRepository;

  beforeAll(async () => {
    await mongoose.connect(`${process.env.DB_TEST_MONGO_URL}`);
    donationRepository = new MongoDonationRepository();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await DonationModel.deleteMany({});
  });

  it('should create a donation with the data passed', async () => {
    const donation: Donation = {
      donatorId: faker.database.mongodbObjectId(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      value: faker.number.float({ min: 1, max: 1000 }),
    };

    const donationCreated = await donationRepository.create(donation);
    const foundDonation = await DonationModel.findById(donationCreated._id);

    expect(foundDonation._id).toBeTruthy();
    expect(foundDonation.donatorId).toEqual(donation.donatorId);
    expect(foundDonation.name).toEqual(donation.name);
    expect(foundDonation.email).toEqual(donation.email);
    expect(foundDonation.value).toEqual(donation.value);
  });
});
