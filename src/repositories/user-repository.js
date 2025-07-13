const db = require('../config/db')

const findByEmail = async (email) => {
    const res = await db.query('select * from users where email=$1', [email]);
    return res.rows[0]
}

const createUser = async (name, email, hashPassword, role = 'user') => {
    const res = await db.query('insert into users (name, email, password, role) values ($1, $2, $3, $4) returning *', [name, email, hashPassword, role]);
    return res.rows[0]
}

const createUserVendor = async (name, email, hashPassword, role = 'vendor') => {
    const res = await db.query('insert into users (name, email, password, role) values ($1, $2, $3, $4) returning *', [name, email, hashPassword, role]);
    return res.rows[0]
}

module.exports = { findByEmail, createUserVendor, createUser }