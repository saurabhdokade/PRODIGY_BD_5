const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
         },
    room: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Room',
         required: true
         },
    checkIn: {
         type: Date,
         required: true
         },
    checkOut: { 
        type: Date,
        required: true
         },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);