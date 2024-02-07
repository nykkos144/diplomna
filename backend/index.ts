import dotenv from 'dotenv';
dotenv.config();

import express, { Express, json } from 'express';
import cors from 'cors';

import connectDB from './config/db';
connectDB();

import routes from './routes/index.route';


const app: Express = express();

app.use(cors());
app.use(json());


app.use('/api', routes);


const PORT: string | undefined = process.env.PORT;

app.listen(PORT, () => {
  console.log('App running on port ' + PORT);
});
