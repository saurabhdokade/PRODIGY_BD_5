const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

/**
 * Book a room
 * @param {string} userId - The ID of the user booking the room
 * @param {string} roomId - The ID of the room to book
 * @param {string} checkIn - The check-in date
 * @param {string} checkOut - The check-out date
 */
const bookRoom = async (userId, roomId, checkIn, checkOut) => {
    try {
        // Check if room exists
        const room = await Room.findById(roomId);
        if (!room) {
            throw new Error('Room not found');
        }

        // Check if room is available during the specified dates
        const existingBooking = await Booking.findOne({
            room: roomId,
            $or: [
                { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }, // Check if dates overlap
            ],
        });

        if (existingBooking) {
            throw new Error('Room is already booked for the selected dates');
        }

        // Create a new booking
        const booking = await Booking.create({
            user: userId,
            room: roomId,
            checkIn,
            checkOut,
        });

        return booking;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Cancel a booking
 * @param {string} userId - The ID of the user canceling the booking
 * @param {string} bookingId - The ID of the booking to cancel
 */
const cancelBooking = async (userId, bookingId) => {
    try {
        // Find the booking and ensure it belongs to the user
        const booking = await Booking.findOne({ _id: bookingId, user: userId });
        if (!booking) {
            throw new Error('Booking not found or unauthorized');
        }

        // Delete the booking
        await Booking.findByIdAndDelete(bookingId);
        return { message: 'Booking canceled successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Get all bookings for a user
 * @param {string} userId - The ID of the user whose bookings are being fetched
 */
const getUserBookings = async (userId) => {
    try {
        const bookings = await Booking.find({ user: userId }).populate('room');
        return bookings;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    bookRoom,
    cancelBooking,
    getUserBookings,
};
