import mongoose from 'mongoose';

const passwordValidator = (value) => {
    // Au moins 8 caractères, dont au moins un chiffre et un caractère spécial
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
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
        // minlength: 6,
        validate: [passwordValidator, 'Le mot de passe doit contenir au moins 8 lettres, un chiffre et un caractère spécial.'],
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