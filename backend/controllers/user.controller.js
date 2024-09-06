import chalk from 'chalk';
import { User } from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // On récupère l'id de l'utilisateur connecté

        // On récupère tous les utilisateurs sauf celui qui est connecté
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password'); // $ne est utilisé dans la requête MongoDB pour signifier “not equal”

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error(chalk.red('Erreur UserController :', error.message));
        res.status(500).json({ error: 'Erreur lors de la récupération d\'un utilisateur' });
    }
};