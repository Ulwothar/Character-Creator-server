import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';

import characterRoutes from './src/routes/character/characterRoutes';
import characterDataRoutes from './src/routes/character/characterDataRoutes';
import swaggerConfig from './src/shared/swaggerConfig';

dotenv.config();

const swaggerDocs = swaggerConfig();

const app = express();
const DB = process.env.DB_URI;

const connectionSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use(express.json());

//makes the folder publicly available
app.use('/images/characters/', express.static('images/characters'));

app.use('/characters', characterRoutes);

app.use('/characterdata', characterDataRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Character Creator API');
});

mongoose
  .connect(DB, connectionSettings)
  .then(() => {
    app.listen(4000);
    console.log('Database Connected!');
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
