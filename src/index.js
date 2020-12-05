const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const middlewares = require('./middlewares')
const bodyParser = require('body-parser');
const multer = require('multer');
const routes = require('./routes/logs');
const path = require('path')
require('dotenv').config();

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,   path.join(__dirname, '/images/'));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().split(':')[0] + '-' + file.originalname)
    }
})

//Defining how to store files

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())


app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use(express.static(path.join(__dirname, './images/')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next();
})

app.use('/api', routes)

app.use(middlewares.notFound)

app.use(middlewares.errorHandler)

const port = process.env.PORT

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ufyip.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("new connection"))

app.listen(port, () => {
    console.log('Listening at port 1337')
});
