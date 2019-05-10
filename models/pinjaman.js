const mongoose = require('mongoose');
const shortid = require('shortid');

const pinjaman = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: shortid.generate
    },
    tanggalPeminjaman: {
        type: Date,
        required: true
    },
    tanggalPengembalian: {
        type: Date,
        required: true
    },
    buku: {
        type: String,
        required: true,
        ref: 'Book'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Pinjaman', pinjaman);