import chalk from 'chalk';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; // On récupère l'id
        const senderId = req.user._id; // Obtention de l'di de l'expéditeur
    } catch (error) {
        console.error(chalk.red('Erreur Send Message Controller :', error.message));
        res.status(500).json({ error: 'Erreur lors de l\'envoi d\'un message' });
    }
};