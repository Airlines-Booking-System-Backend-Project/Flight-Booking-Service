const { StatusCodes } = require('http-status-codes')
const { SuccessResponse, ErrorResponse, isPrismaError } = require('../utils')
const { prismaError } = require('prisma-better-errors')
const { BookingService } = require('../services')


const createBooking = async (req, res) => {
    try {
        const response = await BookingService.createBooking({ flightId: req.body.flightId, userId: req.body.userId, noOfSeats: req.body.noOfSeats })
        return res.status(StatusCodes.OK).json(SuccessResponse("Successfully created the Booking.", response))
    } catch (error) {
        console.log(error)
        if (isPrismaError(error)) {
            let err = new prismaError(error)
            return res.status(err.statusCode).json(err.message, err)
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse("Failed in creating the booking.", error.message))
    }
}

const makePayemnt = async (req, res) => {
    try {
        const response = await BookingService.makePayment({ id: req.body.id, userId: req.body.userId, totalCost: req.body.totalCost })
        return res.status(StatusCodes.OK).json(SuccessResponse("Successfully done the payment.", response))
    } catch (error) {
        console.log(error)
        if (isPrismaError(error)) {
            let err = new prismaError(error)
            return res.status(err.statusCode).json(err.message, err)
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse("Payment failed.", error.message))
    }
}

const getAllBookings = async (req, res) => {
    try {
        const response = await BookingService.getAllBookings()
        return res.status(StatusCodes.OK).json(SuccessResponse("Successfully retrieved all the bookings.", response))
    } catch (error) {
        console.log(error)
        if (isPrismaError(error)) {
            let err = new prismaError(error)
            return res.status(err.statusCode).json(err.message, err)
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse("Failed retrieving all the bookings.", error.message))
    }
}

const getbooking = async (req, res) => {
    try {
        const response = await BookingService.getBooking(parseInt(req.params.id))
        return res.status(StatusCodes.OK).json(SuccessResponse("Successfully retrieved the booking.", response))
    } catch (error) {
        console.log(error)
        if (isPrismaError(error)) {
            let err = new prismaError(error)
            return res.status(err.statusCode).json(err.message, err)
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse("Failed retrieving the booking.", error.message))
    }
}

module.exports = {
    createBooking,
    makePayemnt,
    getAllBookings,
    getbooking
}