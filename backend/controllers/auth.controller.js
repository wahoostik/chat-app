import chalk from 'chalk';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';

export const login = (req, res) => {
    console.log('login');
};

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        // Vérification du mot de passe
        if (password !== confirmPassword) {
            return res.status(400).json({error: 'Le mot de passe et sa confirmation ne sont pas exacts'});
        };

        // Vérification d'un nom d'utilisateur exisatant
        const user = await User.findOne({username});
        if (user) {
            return res.status(400).json({error: 'Le nom d\'utilisateur existe déjà'});
        };

        // Image de profil utilisateur
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Hashage du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Création d'un nouvel utilisateur
        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
        });

        if (newUser) {
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: 'Données d\'utilisateur inccorect'});
        }

    } catch (error) {
        console.error(chalk.red('Erreur Signup Controller :', error.message));
        res.status(500).json({ error: 'Erreur lors de la création d\'un utilisateur' });
    }
};

export const logout = (req, res) => {
    console.log('logout');
};