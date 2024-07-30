import mongoose from 'mongoose';
import chalk from 'chalk';

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(chalk.green('Connexion à Mongo DB réussie !'));
    } catch (error) {
        console.error(chalk.red('Erreur de connexion à Mongo DB : ', error.message));
    }
};