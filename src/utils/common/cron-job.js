const cron = require('node-cron');
const { BookingService } = require('../../services')

function scheduleCrons(){
    cron.schedule('10 * * * *', async () => {
        const bookings = await BookingService.cancelOldBookings();
        bookings.forEach(async (booking) => {
          await BookingService.cancelbooking(booking)
        });
      });
}

module.exports = scheduleCrons