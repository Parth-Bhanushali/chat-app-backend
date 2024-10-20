import express from 'express';
import cors from 'cors';
import connectDatabase from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
