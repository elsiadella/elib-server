const mongoose = require('mongoose');
const moment = require('moment');

const Book = require('../models/book');
const Pinjaman = require('../models/pinjaman');

const environment = require('../env.json');

exports.getBooks = (req, res, next) => {
    Book.find()
        .exec()
        .then(async result => {
            const pinjaman = await Pinjaman.find().populate('user buku');
            const book = result.filter(el => {
                return pinjaman.filter(elPinjaman => {
                    return el._id === elPinjaman.buku._id
                }).length === 0;
            });
            return res.status(200).json(book);
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Something error while getting books'
            });
        });
};

exports.getBook = (req, res, next) => {
    const id = req.params.id;
    Book.findById(id)
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: 'Book not found'
                });
            }
            return res.status(200).json(result);
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Something error while getting book'
            });
        });
};

exports.createBook = (req, res, next) => {
    const file = req.file.filename;
    console.log(file);
    const {
        name,
        kodebuku,
        author,
        deskripsi,
        genre,
        lokasi
    } = req.body;
    const book = new Book({
        name,
        kodebuku,
        gambar: file,
        author,
        deskripsi,
        genre,
        lokasi
    });
    book.save()
        .then(result => {
            return res.status(201).json({
                message: 'Book created'
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Something error while create book'
            });
        });
};