const express = require('express')
const { BookingController } = require('../../../controllers')
const { BookingMiddleware } = require('../../../middleware')

const app = express()
const router = express.Router()

router
    .get('/', BookingController.getAllBookings)
    .get('/:id', BookingMiddleware.isValidId, BookingController.getbooking)
    .post('/', BookingMiddleware.validateInput, BookingController.createBooking)
    .post('/payment', BookingMiddleware.validatePayment, BookingController.makePayemnt)


module.exports = router