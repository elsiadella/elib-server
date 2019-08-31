const mongoose = require('mongoose');
const moment = require('moment');

const Pinjaman = require('../models/pinjaman');

const environment = require('../env.json');

exports.getPeminjamans = (req, res, next) => {
    Pinjaman.find()
        .populate('user buku')
        .exec()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Something error while getting peminjamans'
            });
        });
};

exports.getPeminjaman = (req, res, next) => {
    const id = req.params.id;
    Pinjaman.findById(id)
        .populate('user buku')
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: 'Pinjaman not found'
                });
            }
            return res.status(200).json(result);
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Something error while getting peminjaman'
            });
        });
};

exports.createPeminjaman = (req, res, next) => {
    const user = req.user.id;
    const {
        tanggalPeminjaman,
        tanggalPengembalian,
        buku
    } = req.body;
    const peminjaman = new Pinjaman({
        tanggalPeminjaman,
        tanggalPengembalian,
        buku,
        user
    });
    peminjaman.save()
        .then(result => {
            return res.status(201).json({
                message: 'Pinjaman created'
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Something error while create peminjaman'
            });
        });
};

exports.deletePeminjaman = async (req, res, next) => {
    const id = req.params.id;
    const eve = await Pinjaman.findOne({
        _id: id,
        user: mongoose.mongo.ObjectId(req.user.id)
    });
    if (!eve) {
        return res.status(404).json({
            message: 'Peminjaman not found'
        });
    }
    Pinjaman.findOneAndDelete({
        _id: id
    }, (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Failed to delete peminjaman'
            });
        }
        return res.status(201).json({
            message: 'Peminjaman deleted'
        });
    });
};