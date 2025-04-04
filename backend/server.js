const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
require('dotenv').config();
require('./db');

const app = express();

// ✅ Middleware per JSON e form data (va PRIMA delle rotte!)
app.use(cors());
app.use(express.json()); // <-- QUI
app.use(express.urlencoded({ extended: true }));

// ✅ Rotte API (dopo i middleware di parsing)
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);

// Configurazione Multer per upload immagini recensioni
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Upload immagini
app.post('/api/upload', upload.single('immagine'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Nessun file caricato' });
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Servire immagini statiche
app.use('/uploads', express.static('uploads'));

// Middleware per gestione errori
app.use((err, req, res, next) => {
    console.error('Errore:', err);
    res.status(500).json({ error: 'Errore interno del server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
