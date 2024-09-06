import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import chalk from 'chalk';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRouter from './routers/auth.router.js';
import messageRouter from './routers/message.router.js';
import userRouter from './routers/user.router.js';
import { connectToMongoDB } from './database/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World Express');
});

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(chalk.blue(`Serveur en ligne sur le port : ${PORT}`));
});