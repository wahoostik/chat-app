import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import chalk from 'chalk';
import morgan from 'morgan';

import authRouter from './router/auth.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send('Hello World Express');
});

app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(chalk.blue(`Serveur en ligne sur le port : ${PORT}`))
})