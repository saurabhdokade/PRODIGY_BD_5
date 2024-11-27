const express = require('express');
const {
    bookRoom,
    cancelBooking,
    getUserBookings,
} = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Book a room
router.post('/bookings',authMiddleware, bookRoom);

// Cancel a booking
router.delete('/bookings/:bookingId', authMiddleware, cancelBooking);

// Get user bookings
router.get('/bookings', authMiddleware, getUserBookings);

module.exports = router;
