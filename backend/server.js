import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import chalk from 'chalk';
import morgan from 'morgan';

import authRouter from './routers/auth.router.js';
import { connectToMongoDB } from './database/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World Express');
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(chalk.blue(`Serveur en ligne sur le port : ${PORT}`));
});