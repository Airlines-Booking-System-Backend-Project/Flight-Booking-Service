const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils')

const validateInput = (constraints) => {
    return (req, res, next) => {
        for (const { params, dataType } of constraints) {
            if (!req.body[params] || typeof req.body[params] != dataType) {
                return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse(`Issue in inputs inside the request body.`, `${params} is not defined properly`))
            }
        }
        next()
    }
}

module.exports = validateInput