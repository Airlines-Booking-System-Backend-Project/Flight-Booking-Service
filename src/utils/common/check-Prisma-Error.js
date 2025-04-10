const { Prisma } = require('@prisma/client')

function isPrismaError(error) {
    if (
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientRustPanicError ||
        error instanceof Prisma.PrismaClientUnknownRequestError ||
        error instanceof Prisma.PrismaClientValidationError
    ) { return true; }
    else {
        return false;
    }
}

module.exports = isPrismaError