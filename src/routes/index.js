const express = require('express');
const router = express.Router();

const User = require('../models/user'); // requerir el modelo de datos creado para mongodb

// Ruta de inicio
router.get('/', (req, res) => {
    res.render('index');
});

// Ruta para el login
router.get('/login', (req, res) => {
    res.render('funciones/login');
});

router.post('/addUser', async (req, res) => {
    const {fullName, userName, password} = req.body;
    const newUser = new User({fullName, userName, password});
    if(newUser.fullName == "" || newUser.userName == "" || newUser.password == ""){
        res.render('funciones/register');
    } else {
    await newUser.save();
    res.redirect('/login');
    }
});

// RUta para el registro
router.get('/register', (req, res) => {
    res.render('funciones/register');
});

module.exports = router;