import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const encryptionKey = process.env.ENCRYPTION_KEY;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes); 
app.use('/passwords', passwordRoutes); 

app.get('/', (req, res) => {
  return res.status(200).send('Welcome');
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
