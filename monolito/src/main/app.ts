import express from 'express';
import {
  userRoutes,
  authRoutes,
  donationRoutes,
} from '@adapters/express/routes';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/donation', donationRoutes);

export default app;
