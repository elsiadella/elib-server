const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const {
    createPeminjaman,
    getPeminjaman,
    getPeminjamans,
    deletePeminjaman
} = require('../controllers/peminjaman');

router.get('/', getPeminjamans);

router.get('/:id', getPeminjaman);

router.post('/', auth, createPeminjaman);

router.delete('/:id', auth, deletePeminjaman);

module.exports = router;