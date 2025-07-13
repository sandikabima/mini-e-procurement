const ProductService = require('../services/product-service')

const getAll = async (req, res) => {
    const products = await ProductService.getAll()
    res.json(products)
}

const getById = async (req, res) => {
    const product = await ProductService.getById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Not found' });
}

const create = async (req, res) => {
    const vendorId = req.user.id
    const product = await ProductService.create({ ...req.body, vendor_id: vendorId })
    res.status(201).json(product)
}

const update = async (req, res) => {
    const vendorId = req.user.id
    const productId = req.params.id
    const updated = await ProductService.update(productId, vendorId, req.body)
    res.status(updated.status).json(updated.data)
}

const remove = async (req, res) => {
    const vendorId = req.user.id
    const productId = req.params.id
    const deleted = await ProductService.remove(productId, vendorId)
    res.status(deleted.status).json(deleted.data)
}

module.exports = { getAll, getById, create, update, remove }