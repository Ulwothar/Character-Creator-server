import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

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

app.use(bodyParser.json());

mongoose
  .connect(DB, connectionSettings)
  .then(() => {
    app.listen(4000);
    console.log('Database Connected!');
  })
  .catch((err) => {
    console.log(err);
  });
