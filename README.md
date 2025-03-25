Introduzione
Il progetto sviluppato è una piattaforma web per la raccolta e la visualizzazione di recensioni sui ristoranti. Il sistema consente agli utenti di registrarsi, accedere, esplorare ristoranti, lasciare recensioni e condividerle con altri utenti. Il backend è stato sviluppato con Node.js e Express, mentre il frontend è composto da pagine HTML e script JavaScript per la gestione dinamica dei dati.

Specifiche dell'Applicazione
L'applicazione è stata progettata per fornire le seguenti funzionalità:
Registrazione e autenticazione degli utenti.
Visualizzazione di una lista di ristoranti.
Inserimento e gestione delle recensioni con voto e commenti.
Caricamento di immagini nelle recensioni.
Protezione delle API con autenticazione basata su sessioni.
Interazione dinamica con il frontend attraverso richieste API REST.

Struttura del Database
Il database è stato implementato utilizzando MySQL e include le seguenti tabelle:
Tabella utenti
CREATE TABLE utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    ruolo ENUM('utente', 'proprietario') NOT NULL
);
Tabella ristoranti
CREATE TABLE ristoranti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo_cucina VARCHAR(255) NOT NULL,
    proprietario_id INT NOT NULL,
    prezzo VARCHAR(255) NOT NULL,
    categoria VARCHAR(100)
    FOREIGN KEY (proprietario_id) REFERENCES utenti(id),
);
Tabella recensioni
CREATE TABLE recensioni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utente_id INT NOT NULL,
    ristorante_id INT NOT NULL,
    voto INT CHECK (voto BETWEEN 1 AND 5),
    commento TEXT NOT NULL,
    immagine VARCHAR(255),
    FOREIGN KEY (utente_id) REFERENCES utenti(id),
    FOREIGN KEY (ristorante_id) REFERENCES ristoranti(id)
);

API REST Implementate
Autenticazione
POST /api/auth/register: Registra un nuovo utente.
POST /api/auth/login: Effettua il login e avvia una sessione utente.
Ristoranti
GET /api/restaurants: Restituisce la lista di tutti i ristoranti.
Recensioni
POST /api/reviews: Aggiunge una nuova recensione.
GET /api/reviews/:ristorante_id: Restituisce le recensioni di un ristorante specifico.


Test Effettuati
Sono stati condotti diversi test per verificare il corretto funzionamento dell'applicazione:
Test di Autenticazione
Registrazione di un nuovo utente.
Login con credenziali valide e non valide.
Logout e verifica della distruzione della sessione.
Test delle API
Recupero della lista di ristoranti.
Inserimento di nuove recensioni.
Visualizzazione delle recensioni per un ristorante specifico.
Test di Validazione dei Dati
Inserimento di una recensione con voto fuori dall'intervallo 1-5 (deve fallire).
Registrazione con email già esistente (deve fallire).
Test delle Sessioni
Accesso a pagine protette senza login (deve restituire errore 401).
Mantenimento della sessione dopo il login.


