const mongoose = require('mongoose');

const user = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    jurusan: {
        type: String,
        required: true
    },
    prodi: {
        type: String,
        required: true
    },
    semester: {
        type: String
    },
});

module.exports = mongoose.model('User', user);