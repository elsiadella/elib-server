const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/user');

exports.createAccount = async (req, res, next) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const jurusan = req.body.jurusan;
    const prodi = req.body.prodi;
    const semester = req.body.semester;
    const usr = await Users.findOne({
        username
    });
    if (usr) {
        return res.status(409).json({
            message: 'Username already taken'
        });
    }
    bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Something error while hashing your password'
            });
        }
        const user = new Users({
            name,
            username,
            password: hash,
            jurusan,
            prodi,
            semester
        });
        user.save()
            .then(result => {
                return res.status(201).json({
                    message: 'Account created'
                });
            })
            .catch(error => {
                return res.status(500).json({
                    message: 'Something error while creating your account'
                });
            });
    });
};

exports.login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const usr = await Users.findOne({
        username
    });
    if (!usr) {
        return res.status(404).json({
            message: 'Username not registered'
        });
    }
    bcrypt.compare(password, usr.password, (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Something error while comparing your password'
            });
        } else if (result) {
            const token = jwt.sign({
                id: usr._id,
                username: usr.username,
                jurusan: usr.jurusan,
                prodi: usr.prodi,
                semester: usr.semester
            }, 'secret');
            res.setHeader('Authorization', 'Bearer ' + token);
            return res.status(201).json({
                message: 'Login success',
                id: usr._id,
                username: usr.username,
                name: usr.name,
                token: `Bearer ${token}`
            });
        }
        return res.status(401).json({
            message: 'Wrong password'
        });
    });
};