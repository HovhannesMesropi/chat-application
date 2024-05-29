import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { Core } from './modules'

dotenv.config();

const app = express()
app.use(bodyParser.json())
new Core(app);

app.listen(process.env.PORT, () => console.log('express app running at ' + process.env.PORT))