const { PrismaClient } = require('@prisma/client')

class BookingCrud {
    constructor() {
        this.prisma = new PrismaClient()
    }

    async createBooking(data, t) {
        const response = await t.booking.create({
            data
        })
        return response
    }

    async deleteBooking(id) {
        const response = await this.prisma.booking.deleteMany({
            where: { id }
        })
        return response
    }

    async readBooking(id) {
        const response = await this.prisma.booking.findFirst({
            where: { id }
        })
        return response
    }

    async updateBooking(id, data, t = this.prisma) {
        const response = await t.booking.update({
            where: { id },
            data: data
        })
        return response
    }

    async getBooking(id, t = this.prisma) {
        const response = await t.booking.findMany({
            where: { id }
        })
        return response
    }

    async getAllBookings() {
        const response = await this.prisma.booking.findMany()
        return response
    }

    async cancelOldBookings(time) {
        const response = await this.prisma.booking.findMany({
            where: {
                createdAt: {
                    lt: time
                },
                status: {
                    in: ["Initiated", "Pending"]
                }
            }
        })
        return response
    }
}

module.exports = BookingCrud