import express from 'express';
import userRoutes from '@adapters/express/routes/userRoutes';

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);

export default app;
