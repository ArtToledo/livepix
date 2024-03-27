import { Donation } from '@entities/Donation';

export interface DonationRepository {
  create(data: Donation): Promise<Donation>;
}
