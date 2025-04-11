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

const isValidId = (req, res, next) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse('id is not provided properly.', 'id provided should be a number.'))
    }
    next()
}

module.exports = {
    validateInput: validateInput(constraints),
    validatePayment: validateInput(constraintsForPayment),
    isValidId
}