import { DonationRepository } from '@domains/repositories';
import { Donation } from '@entities/Donation';
import { DonationModel } from '@models/DonationModel';

export class MongoDonationRepository implements DonationRepository {
  async create(params: Donation): Promise<Donation> {
    return DonationModel.create(params);
  }
}
