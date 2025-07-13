const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const app = express()

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth-router'));
app.use('/api/products', require('./routes/product-router'));
app.use('/api/request', require('./routes/request-router'));

const PORT = process.env.PORT || 6000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))