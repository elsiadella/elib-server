const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const user = require('./routes/user');
const book = require('./routes/book');
const upload = require('./routes/upload');
const pinjaman = require('./routes/pinjaman');

const environment = require('./env.json');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/api/user', user);
app.use('/api/upload', upload);
app.use('/api/book', book);
app.use('/api/pinjaman', pinjaman);

app.use((req, res, next) => {
    const error = new Error('Endpoint not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
});

mongoose.connect(environment.env.MONGODB_URI, {
    useNewUrlParser: true
}, (error, result) => {
    if (error) {
        return console.log(error);
    }
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 3000);
});
mongoose.Promise = global.Promise;