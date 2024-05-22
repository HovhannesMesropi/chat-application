import express from 'express';
import dotenv from 'dotenv';
import { Core } from './modules'
dotenv.config();

const app = express()

new Core(app);

app.listen(process.env.PORT, () => console.log('express app running at ' + process.env.PORT))