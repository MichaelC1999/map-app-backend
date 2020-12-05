const mongoose = require('mongoose');

const { Schema } = mongoose;

const logEntrySchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: String,
    
    town: {
        type: String,
        required: true
    },
    state : {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    comments: [{body: String, date: Date}],
    rating: {
        type: Number,
        required: true,
        minimum: 0,
        maximum: 10,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true,
        minimum: -90,
        maximum: 90
    },
    longitude: {
        type: Number,
        required: true,
        minimum: -180,
        maximum: 180
    },
    visitDate: {
        required: true,
        type: Date
    }
}, {
    timestamps: true
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;