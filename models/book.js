const mongoose = require('mongoose');
const shortid = require('shortid');

const book = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: shortid.generate
    },
    name: {
        type: String,
        required: true
    },
    kodebuku: {
        type: String,
        required: true
    },
    gambar: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    lokasi: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Book', book);