const express = require('express')
const router = express.Router()
const RequestController = require('../controllers/request-controller')
const autenticate = require('../middleware/autenticate')
const authorizeRole = require('../middleware/authorizeRole')

router.use(autenticate);

router.post('/', authorizeRole('user'), RequestController.createRequest)
router.get('/:id', authorizeRole('user'), RequestController.getRequestDetails)


module.exports = router