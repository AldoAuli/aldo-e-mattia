const express = require('express');
const db = require('../db');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configurazione Multer per l'upload delle immagini
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Aggiungi una recensione (senza autenticazione)
router.post('/', upload.single('immagine'), (req, res) => {
    const { ristorante_id, voto, commento } = req.body;
    const immagine = req.file ? `/uploads/${req.file.filename}` : null;

    // Validazione dei dati
    if (!ristorante_id || !voto || !commento) {
        return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
    }
    if (voto < 1 || voto > 5) {
        return res.status(400).json({ error: 'Il voto deve essere tra 1 e 5' });
    }

    // Inserimento nel database (senza autenticazione utente)
    db.query(
        'INSERT INTO recensioni (ristorante_id, voto, commento, immagine) VALUES (?, ?, ?, ?)',
        [ristorante_id, voto, commento, immagine],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Recensione aggiunta con successo!' });
        }
    );
});

// Ottieni recensioni per un ristorante
router.get('/:ristorante_id', (req, res) => {
    db.query(
        `SELECT recensioni.*, utenti.nome AS utente_nome 
         FROM recensioni 
         JOIN utenti ON recensioni.utente_id = utenti.id 
         WHERE ristorante_id = ?`,
        [req.params.ristorante_id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
});

module.exports = router;
