import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import characterRoutes from './routes/character/characterRutes';
import characterDataRoutes from './routes/character/characterDataRoutes';
import formData from './routes/formData/formData';

dotenv.config();

const app = express();
const DB = process.env.DB_URI;

const connectionSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

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

app.use('/character', characterRoutes);

app.use('/characterdata', characterDataRoutes);

app.use('/formdata', formData);

app.get('/', (req, res) => {
  res.send('does it work?');
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
