class User {
    constructor(db) { this.db = db; }
    create(nome, email, password, ruolo, callback) {
        this.db.query('INSERT INTO utenti (nome, email, password, ruolo) VALUES (?, ?, ?, ?)', [nome, email, password, ruolo], callback);
    }
}
module.exports = User;
