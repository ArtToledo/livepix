import express from 'express';
import { userRoutes, authRoutes } from '@adapters/express/routes';

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

export default app;
