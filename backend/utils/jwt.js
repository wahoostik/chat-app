import jwt from 'jsonwebtoken';

export const generateTokenAndCookie = (userId, res) => {

    // Création du token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d', // Il expire dans 15 jours
    });

    // On envoi le token dans le cookie
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 jours en millisecondes
        httpOnly: true, // Prévenir les attaques XSS (cross-site scripting), pour que le cookie ne soit pas accessible via JavaScript
        sameSite: 'strict', // Attaques CSRF (cross-site request forgery)
        secure: process.env.NODE_ENV !== 'development', // En production = true, en développement = false
    });
};