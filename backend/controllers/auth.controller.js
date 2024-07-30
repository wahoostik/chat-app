import chalk from 'chalk';

export const login = (req, res) => {
    console.log('login');
};

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
    } catch (error) {
        console.error(chalk.red('Erreur Signup :', error));
    }
};

export const logout = (req, res) => {
    console.log('logout');
};