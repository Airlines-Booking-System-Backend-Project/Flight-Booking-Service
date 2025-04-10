const express = require('express')

const app = express()
const router = express.Router()
const bookingRouter = require('./booking')

router.use('/booking', bookingRouter)

module.exports = router