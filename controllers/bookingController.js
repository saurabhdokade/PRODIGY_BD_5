const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

/**
 * Book a Room
 */
const bookRoom = async (req, res) => {
    try {
        const { roomId, checkIn, checkOut } = req.body;
        const userId = req.user?.id || req.body.user; // Use `req.user.id` or fallback to `req.body.user`

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Check if room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Check for overlapping bookings
        const existingBooking = await Booking.findOne({
            room: roomId,
            $or: [{ checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }],
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'Room is already booked for the selected dates' });
        }

        // Create booking
        const booking = await Booking.create({ user: userId, room: roomId, checkIn, checkOut });
        res.status(201).json({ message: 'Room booked successfully', booking });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error booking room', error });
    }
};

/**
 * Cancel a Booking
 */
const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        // Check if booking exists and belongs to the user
        const booking = await Booking.findOne({ _id: bookingId, user: req.user.id });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found or unauthorized' });
        }

        // Delete the booking
        await Booking.findByIdAndDelete(bookingId);

        res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling booking', error });
    }
};

/**
 * View Bookings for the User
 */
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('room');
        res.status(200).json({ message: 'Bookings retrieved successfully', bookings });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error });
    }
};

module.exports = { bookRoom, cancelBooking, getUserBookings };
