const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM ristoranti', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

module.exports = router;