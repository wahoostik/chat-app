import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        // Les valeurs de ces champs doivent être des identifiants d’objet MongoDB (ObjectId).
        // Ces identifiants sont utilisés pour référencer des documents dans une autre collection, en l’occurrence la collection User.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Relation de référence avec la collection User
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true } // Permet de créer et de mettre à jour
);

export const Message = mongoose.model('Message', messageSchema);