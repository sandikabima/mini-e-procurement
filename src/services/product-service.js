const ProductRepo = require('../repositories/product-repository')

const getAll = () => ProductRepo.getAll();
const create = (data) => ProductRepo.create(data);
const update = async (id, vendorId, data) => {
    const existing = await ProductRepo.findById(id)
    if (!existing || existing.vendor_id !== vendorId) return { status: 403, data: { message: 'Unauthorized' } };

    const result = await ProductRepo.update(id, data)
    return { status: 200, data: { message: 'Updated', result } };
}
const remove = async (id, vendorId) => {
    const existing = await ProductRepo.findById(id)
    if (!existing || existing.vendor_id !== vendorId) return { status: 403, data: { message: 'Unauthorized' } };

    await ProductRepo.remove(id)
    return { status: 200, data: { message: 'Deleted successfully' } };
};

module.exports = { getAll, create, update, remove }


