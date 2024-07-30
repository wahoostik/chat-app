export const login = (req, res) => {
    console.log('login');
};

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
    } catch (error) {
        console.trace('Error Signup :', error);
    }
};

export const logout = (req, res) => {
    console.log('logout');
};