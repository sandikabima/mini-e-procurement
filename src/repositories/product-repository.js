const db = require('../config/db')

const getAll = async () => {
    const res = await db.query('select p.id, p.name, p.price, p.description, u.name as vendor_name from products p join users u on p.vendor_id = u.id');
    return res.rows;
}

const findById = async (id) => {
    const res = await db.query('select * from products where id= $1', [id]);
    return res.rows[0]
}

const create = async ({ name, description, price, vendor_id }) => {
    const res = await db.query('insert into products (name, description, price, vendor_id) values ($1, $2, $3, $4) returning *', [name, description, price, vendor_id]);
    return res.rows[0]
}

const update = async (id, data) => {
    const { name, description, price } = data
    const res = await db.query('update products set name=$1, description=$2, price=$3 where id=$4 returning *', [name, description, price, id]);
    return res.rows[0]
}

const remove = async (id) => {
    const res = await db.query('delete from products where id = $1', [id]);
    return res.rows[0]
}

module.exports = { getAll, findById, create, update, remove }