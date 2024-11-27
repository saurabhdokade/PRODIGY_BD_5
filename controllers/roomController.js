const Room = require('../models/roomModel');

const createRoom = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.user;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const roomData = { ...req.body, user: userId };
        const room = await Room.create(roomData);
        res.status(201).json({ message: 'Room created successfully', room });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error creating room', error });
    }
};

module.exports = { createRoom };

