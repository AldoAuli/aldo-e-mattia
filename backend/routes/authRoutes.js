const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { nome, email, password, ruolo } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO utenti (nome, email, password, ruolo) VALUES (?, ?, ?, ?)', 
        [nome, email, hashedPassword, ruolo], 
        (err) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Utente registrato!' });
        });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM utenti WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (!results.length || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).send({ message: 'Credenziali errate' });
        }
        const token = jwt.sign({ id: results[0].id, ruolo: results[0].ruolo }, 'ABC123', { expiresIn: '1h' });
        res.send({ token });
    });
});

module.exports = router;
