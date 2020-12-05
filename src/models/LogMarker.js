const mongoose = require('mongoose');

const { Schema } = mongoose;

const LogMarkerSchema = new Schema({
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
    LogEntryID: {
        type: Schema.Types.ObjectId,
        ref: 'LogEntry',
        required: true
    }
})

const LogMarker = mongoose.model('LogMarker', LogMarkerSchema);

module.exports = LogMarker;