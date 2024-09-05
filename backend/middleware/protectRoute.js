import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import { User } from '../models/user.model.js';

// On vérifie que l'utilisateur est bien connecté pour envoyer un message
export const protectRoute = async (req, res, next) => {
    try {
        // On récupère le token du cookie
        const token = req.cookies.jwt;

        // Si il n'y a pas de Token
        if (!token) {
            return res.status(401).json({ error: 'Non autorisé - Aucun Token n\'est fourni' });
        }

        // Si il y a bien un Token, on le décode et vérifie
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Si il n'y a pas de décodage
        if (!decoded) {
            return res.status(401).json({ error: 'Non autorisé - Token invalide' });
        }

        // On cherche l'utilisateur par son ID, sans son mot de passe
        const user = await User.findById(decoded.userId).select('-password');

        // Si on ne trouve pas l'utilisateur
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable' });
        }

        // Utilisateur authentifié
        req.user = user;

        next();
        /* next est une fonction de rappel (callback) utilisée dans les middlewares Express.js.
        Elle permet de passer le contrôle au middleware suivant dans la chaîne.
        Ici, il va vérifier le token, décoder le token, chercher l'utilisateur. Si toutes les vérifications sont réussies, next() est appelé pour passer le contrôle au middleware ou à la route suivante.  Si une erreur est rencontrée à n’importe quelle étape, le contrôle ne passe pas au middleware suivant et une réponse d’erreur est envoyée immédiatement.
        */
        
    } catch (error) {
        console.error(chalk.red('Erreur Protect Route Middleware :', error.message));
        res.status(500).json({ error: 'Internal server error' });
    }
};