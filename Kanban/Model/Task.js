const mongoose = require('mongoose');


const taskSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    columnId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'column id is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "userId is required"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);