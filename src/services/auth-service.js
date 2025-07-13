const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserRepo = require('../repositories/user-repository')

const register = async (name, email, password) => {
    const existingUser = await UserRepo.findByEmail(email);
    if (existingUser) throw new Error('Email already registered');

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await UserRepo.createUser(name, email, hashed);
    return newUser;
}

const registerVendor = async (name, email, password) => {
    const existingUser = await UserRepo.findByEmail(email);
    if (existingUser) throw new Error('Email already registered');

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await UserRepo.createUserVendor(name, email, hashed);
    return newUser;
}


const login = async (email, password) => {
    const user = await UserRepo.findByEmail(email);
    if (!user) throw new Error('User Not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    return { user, token }
}

module.exports = { register, registerVendor, login }