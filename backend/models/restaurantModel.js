class Restaurant {
    constructor(db) { this.db = db; }
    getAll(callback) {
        this.db.query('SELECT * FROM ristoranti', callback);
    }
}
module.exports = Restaurant;