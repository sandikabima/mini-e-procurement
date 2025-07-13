const db = require('../config/db')
const requestRepo = require('../repositories/request-repository')

const request = async (userId, items) => {
    if (!Array.isArray(items) || items.length === 0) return { status: 400, data: { message: 'Items required' } };

    const client = await db.connect()
    try {
        await client.query('BEGIN')
        const createRequest = await requestRepo.createRequest(userId)

        for (const item of items) {
            await requestRepo.createRequestItem(createRequest.id, item.product_id, item.quantity)
        }

        await client.query('COMMIT')
        return { status: 200, data: { message: 'Request successfully', createRequest } };
    } catch (err) {
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }
}

const getRequestDetail = async (id, userId) => {
    const datas = await requestRepo.findRequestDetail(id, userId)
    return { datas };
}

module.exports = { request, getRequestDetail }