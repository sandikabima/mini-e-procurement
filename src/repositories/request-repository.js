const db = require('../config/db')

const createRequest = async (userId, status = 'pending') => {
    const res = await db.query('insert into purchase_requests (user_id, status) values ($1, $2) returning *', [userId, status]);
    return res.rows[0]
}

const createRequestItem = async (requestId, productId, quantity) => {
    await db.query('insert into purchase_request_item (request_id, product_id, quantity) values ($1, $2, $3)', [requestId, productId, quantity])
}

const findRequestDetail = async (requestId, userId) => {
    const res = await db.query(`
        SELECT 
            pr.id AS request_id,
            pr.status,
            p.name AS product_name,
            p.price,
            pri.quantity
        FROM purchase_requests pr
        JOIN purchase_request_item pri ON pri.request_id = pr.id
        JOIN products p ON pri.product_id = p.id
        WHERE pr.id = $1 AND pr.user_id = $2
        `, [requestId, userId]);
    return res.rows
}

module.exports = { createRequest, createRequestItem, findRequestDetail }