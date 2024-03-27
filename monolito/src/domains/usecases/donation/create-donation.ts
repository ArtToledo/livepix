import { DonationRepository } from '@domains/repositories';
import { Donation } from '@entities/Donation';

export class CreateDonationUseCase {
  constructor(private donationRepository: DonationRepository) {}

  async execute(params: Donation): Promise<Donation> {
    return this.donationRepository.create(params);
  }
}
