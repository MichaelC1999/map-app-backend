const LogEntry = require('../models/LogEntry');
const LogMarker = require('../models/LogMarker');
const middlewares = require('../middlewares');

exports.postLog = async (req, res, next) => {
    try {
        const imgPath = await middlewares.cloudinary(req.file.path)
        const logEntry = new LogEntry({
            title: req.body.title,
            image: imgPath,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            visitDate: req.body.visitDate,
            town: req.body.town,
            state: req.body.state,
            country: req.body.country,
            description: req.body.description
        })

        await logEntry.save();

        const logMarker = new LogMarker({
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            LogEntryID: logEntry._id
        })

        await logMarker.save()

        res.json({message: "Entry stored and saved", logEntry: logEntry._id, logMarker: logMarker._id});

    } catch (error) {
        console.log(error)
        res.status(422)
        next(error);
    }

}

exports.getMarkers = async (req, res, next) => {
    try {
        const markers = await LogMarker.find();
        res.json({message: "Markers fetched", markers: markers});
    } catch (error) {
        res.status(422)
        next(error);
    }
}

exports.getEntry = async (req, res, next) => {
    try {
        const entry = await LogEntry.findById(req.params.id);
        res.json({message: "Entry returned", entry: entry});
    } catch (err) {
        res.status(422)
        next(error);
    }
}