import mongoose from 'mongoose';

const passwordValidator = (value) => {
    // Entre 6 et 60 caractères dont une capitale, dont au moins un chiffre et un caractère spécial
    // Cette validation est effectuée au niveau de l’application et non au niveau de la base de données
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,60}$/;
    return regex.test(value);
};

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: [passwordValidator, 'Le mot de passe doit contenir au moins 6 lettres dont une capitale, un chiffre et un caractère spécial.'],
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    profilePic: {
        type: String,
        default: '',
    },
});

export const User = mongoose.model('User', userSchema);