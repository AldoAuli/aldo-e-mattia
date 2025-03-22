class Review {
    constructor(db) { this.db = db; }
    add(utente_id, ristorante_id, voto, commento, immagine, callback) {
        this.db.query('INSERT INTO recensioni (utente_id, ristorante_id, voto, commento, immagine) VALUES (?, ?, ?, ?, ?)', [utente_id, ristorante_id, voto, commento, immagine], callback);
    }
}
module.exports = Review;