const AuthService = require('../services/auth-service')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await AuthService.register(name, email, password);
        res.status(201).json({ user })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const registerVendor = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await AuthService.registerVendor(name, email, password);
        res.status(201).json({ user })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const { user, token } = await AuthService.login(email, password);
        res.json({ user, token })
    } catch (err) {
        res.status(401).json({ message: err.message })
    }
}

module.exports = { register, registerVendor, login }