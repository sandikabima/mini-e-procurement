const requestService = require('../services/request-services')

const createRequest = async (req, res) => {
    const userId = req.user.id
    const result = await requestService.request(userId, req.body.items)
    res.status(result.status).json(result.data)
}

const getRequestDetails = async (req, res) => {
    const userId = req.user.id
    const data = await requestService.getRequestDetail(req.params.id, userId)
    res.json(data)
}



module.exports = { createRequest, getRequestDetails }