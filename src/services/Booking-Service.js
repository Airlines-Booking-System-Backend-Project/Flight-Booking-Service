const axios = require('axios')
const { StatusCodes } = require('http-status-codes')
const { FLIGHT_SERVICE } = require('../config')
const { PrismaClient } = require('@prisma/client')
const { BookingCrud } = require('../repositories')

const BookingService = new BookingCrud()
const prisma = new PrismaClient();

async function createBooking(data) {
    const response = await prisma.$transaction(async (t) => {
        const flight = await axios.get(`${FLIGHT_SERVICE}/api/v1/flight/${data.flightId}`)
        const flightData = flight.data.data
        if (flightData.totalSeats < data.noOfSeats) {
            throw new Error("Enough seats are not available.")
        }
        data.totalCost = data.noOfSeats * flightData.price
        const response = await BookingService.createBooking(data, t)
        await axios.patch(`${FLIGHT_SERVICE}/api/v1/flight/${data.flightId}/seats`, { seats: data.noOfSeats, dec: true })
        return response
    })

    return response
}

async function makePayment(data) {
    const response = await prisma.$transaction(async (t) => {
        const bookingDetails = await BookingService.getBooking(data.id);
        if(bookingDetails[0].status == "Booked"){
            throw new Error("Already booked. No need to do payment again.")
        }
        if(bookingDetails[0].status == "Cancelled"){
            throw new Error("The booking has expired.")
        }
        const bookingTime = bookingDetails[0].createdAt;
        const currentTime = new Date()
        if(currentTime - bookingTime > 300000){
            await cancelbooking(bookingDetails[0])
            throw new Error("The booking has expired.")
        }
        if (bookingDetails[0].totalCost != data.totalCost) {
            throw new Error("The amount of payment does not match.")
        }
        if (bookingDetails[0].userId != data.userId) {
            throw new Error("The user corresponding to the booking does not match.")
        }
        const response = await BookingService.updateBooking(data.id, { status: 'Booked' }, t)
        return response
    })
    return response
}

async function cancelbooking(bookingDetails){
    await prisma.$transaction(async (t)=> {
        console.log(bookingDetails)
        if(bookingDetails.status == "Cancelled"){
            return
        }
        await axios.patch(`${FLIGHT_SERVICE}/api/v1/flight/${bookingDetails.flightId}/seats`, { seats: bookingDetails.noOfSeats })
        await BookingService.updateBooking(bookingDetails.id, { status: 'Cancelled' }, t)
    })
}

async function cancelOldBookings(){
    const time = new Date(Date.now() - 5*60*1000);
    const response = await BookingService.cancelOldBookings(time)
    return response
}

async function updateBooking(id, data) {
    const response = await BookingService.updateBooking(id, data)
    return response
}

async function deleteBooking(id) {
    const response = await BookingService.deleteBooking(id)
    return response
}

async function getAllBookings() {
    const response = await BookingService.getAllBookings()
    return response
}

async function getBooking(id) {
    const response = await BookingService.readBooking(id)
    return response
}

module.exports = {
    getAllBookings,
    getBooking,
    deleteBooking,
    createBooking,
    updateBooking,
    makePayment,
    cancelOldBookings,
    cancelbooking
}