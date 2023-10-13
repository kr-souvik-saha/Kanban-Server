const mongoose = require('mongoose');

const containerSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "userId is required"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Container', containerSchema)