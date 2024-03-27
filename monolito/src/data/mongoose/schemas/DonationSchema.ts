import { Schema, model, Document } from 'mongoose';

export interface Donation extends Document {
  donatorId: string;
  name: string;
  email: string;
  value: number;
}

const DonationSchema = new Schema<Donation>({
  donatorId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  value: { type: Number, required: true },
});

export default model<Donation>('Donation', DonationSchema);
