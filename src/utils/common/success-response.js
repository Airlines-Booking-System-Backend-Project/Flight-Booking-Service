function SuccessResponse(message, explanation) {
    return {
        success: true,
        message: message || "Successfully completed the request",
        data: explanation || {},
        error: {}
    }
}

module.exports = SuccessResponse 