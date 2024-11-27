const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
         },
    name: {
         type: String,
         required: true
         },
    location: {
         type: String,
         required: true
         },
    price: {
         type: Number,
         required: true
         },
    description: {
         type: String,
         required: true
         },
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
