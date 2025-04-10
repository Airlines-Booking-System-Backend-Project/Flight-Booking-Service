const { StatusCodes } = require('http-status-codes');
const validateInput = require('./input-middleware');


const constraints = [
    { params: 'flightId', dataType: 'number' },
    { params: 'userId', dataType: 'number' },
    { params: 'noOfSeats', dataType: 'number' }
]

const constraintsForPayment = [
    { params: 'id', dataType: 'number' },
    { params: 'userId', dataType: 'number' },
    { params: 'totalCost', dataType: 'number' }
]

module.exports = {
    validateInput: validateInput(constraints),
    validatePayment: validateInput(constraintsForPayment)
}