import { Model } from 'mongoose';
import DonationSchema, { Donation } from '@schemas/DonationSchema';

const DonationModel: Model<Donation> = DonationSchema;

export default DonationModel;
