const express = require('express')
const { BookingController } = require('../../../controllers')
const { BookingMiddleware } = require('../../../middleware')

const app = express()
const router = express.Router()

router
    .post('/', BookingMiddleware.validateInput, BookingController.createBooking)
    .post('/payment', BookingMiddleware.validatePayment, BookingController.makePayemnt)


module.exports = router