const express = require('express');
const router = express.Router();

const {
    createAccount,
    login,
    getUser
} = require('../controllers/user');

router.post('/create-account', createAccount);

router.post('/login', login);

module.exports = router;