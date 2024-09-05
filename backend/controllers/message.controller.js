import chalk from 'chalk';
import { Conversation } from '../models/conversation.model.js';
import { Message } from '../models/message.model.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; // On récupère l'id
        const senderId = req.user._id; // Obtention de l'ID de l'expéditeur

        // On trouver une conversation entre 2 utilisateurs
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // Si on ne trouve pas de conversation, on en créer une
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // On créée la conversation
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Si le message est bien crée
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // On enregistre en BDD et on met à jour
        // await conversation.save();
        // await newMessage.save();

        // Optimisation, en parallèle
        await Promise.all([conversation.save(), newMessage.save()]);

        // On renvoi le message
        res.status(201).json(newMessage);
        
    } catch (error) {
        console.error(chalk.red('Erreur Send Message Controller :', error.message));
        res.status(500).json({ error: 'Erreur lors de l\'envoi d\'un message' });
    }
};