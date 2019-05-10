const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const {
    upload
} = require('../middlewares/upload');
const {
    createBook,
    getBook,
    getBooks,
} = require('../controllers/book');

router.get('/', getBooks);

router.get('/:id', getBook);

router.post('/', upload.single('gambar'), createBook);

module.exports = router;