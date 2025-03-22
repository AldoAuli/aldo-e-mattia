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

// Abilita CORS per permettere richieste da frontend
app.use(cors());
app.use('/api/reviews', reviewRoutes); // Aggiungi la tua route per le recensioni

// Middleware per gestire JSON e URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurazione Multer per upload immagini recensioni
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Servire immagini statiche
app.use('/uploads', express.static('uploads'));

// Rotte API
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);

// Rotta per caricare immagini (collegata a reviewRoutes)
app.post('/api/upload', upload.single('immagine'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Nessun file caricato' });
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Middleware per gestire errori globali
app.use((err, req, res, next) => {
    console.error('Errore:', err);
    res.status(500).json({ error: 'Errore interno del server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
