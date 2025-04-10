function ErrorResponse(message, explanation) {
    return {
        success: false,
        message: message || "Error occured",
        data: {},
        error: { explanation } || "No explanation provided"
    }
}

module.exports = ErrorResponse