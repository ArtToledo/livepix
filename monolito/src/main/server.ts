require('dotenv').config();
import { MongoHelper } from '../infra/config';
import app from './app';

MongoHelper.connect(process.env.DB_MONGO_URL)
  .then(async () => {
    const port = process.env.PORT;
    app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`),
    );
  })
  .catch(console.error);
