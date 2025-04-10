const express = require('express')

const router = express.Router()
const app = express()
const v1routes = require('./v1')

router.use('/v1', v1routes)

module.exports = router