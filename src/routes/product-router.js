const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product-controller')
const autenticate = require('../middleware/autenticate')
const authorizeRole = require('../middleware/authorizeRole')

router.get('/', ProductController.getAll);
router.post('/', autenticate, authorizeRole('vendor'), ProductController.create)
router.put('/:id', autenticate, authorizeRole('vendor'), ProductController.update)
router.delete('/:id', autenticate, authorizeRole('vendor'), ProductController.remove)

module.exports = router