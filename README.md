Relazione sul Lavoro Svolto
Introduzione
Il progetto sviluppato è una piattaforma web per la raccolta e la visualizzazione di recensioni sui ristoranti. Il sistema consente agli utenti di registrarsi, accedere, esplorare ristoranti, lasciare recensioni e condividerle con altri utenti. Il backend è stato sviluppato con Node.js e Express, mentre il frontend è composto da pagine HTML e script JavaScript per la gestione dinamica dei dati.

Struttura del Progetto
Il progetto è suddiviso in due parti principali:
Frontend (HTML, CSS, JavaScript)


Backend (Node.js, Express, MySQL)



Frontend
File Principali
index.html – Pagina principale del sito


register.html – Pagina di registrazione degli utenti


login.html – Pagina di login degli utenti


reviews.html – Pagina dedicata alla gestione delle recensioni


File JavaScript
restaurants.js – Carica e visualizza la lista di ristoranti


reviews.js – Gestisce il caricamento e l'invio delle recensioni


auth.js – Gestisce le operazioni di login e registrazione



Dettagli sulle Pagine
1. index.html
Contiene la homepage con un'intestazione, una sezione introduttiva e un elenco di ristoranti.


Include un collegamento al file styles.css per la gestione del design.


Navbar con collegamenti a login e registrazione.


Lo script restaurants.js è referenziato per la gestione dinamica della lista ristoranti.


2. register.html
Form per la registrazione con campi per nome, email, password e ruolo (utente o proprietario).


Include auth.js per gestire la registrazione.


3. login.html
Pagina di accesso con form per email e password.


Collega auth.js per la gestione del login.


Reindirizza gli utenti alla pagina delle recensioni dopo il login.


4. reviews.html
Mostra un'interfaccia per la visualizzazione e l’invio di recensioni sui ristoranti.


Form con opzioni di voto, commento e caricamento di immagini.


Gestita dallo script reviews.js.



Dettagli sui File JavaScript
1. restaurants.js
Effettua una richiesta all'API (http://localhost:5000/api/restaurants) per ottenere l'elenco dei ristoranti.


Inserisce dinamicamente i ristoranti nel DOM.


2. reviews.js
Recupera i ristoranti e permette agli utenti di scrivere recensioni.


Mostra un form dinamico per l'inserimento della recensione.


Invia i dati tramite una richiesta POST all'API (http://localhost:5000/api/reviews).


3. auth.js
Gestisce il login: invia email e password all'API (http://localhost:5000/api/auth/login) e salva il token in localStorage.


Gestisce la registrazione: invia i dati al server e reindirizza alla pagina delle recensioni in caso di successo.



Backend
File Principali
server.js – Configura il server con Express, gestisce middleware e rotte


authMiddleware.js – Middleware per la protezione delle API con JWT


Models


restaurantModel.js – Modello per la gestione dei ristoranti nel database


reviewModel.js – Modello per la gestione delle recensioni


userModel.js – Modello per la gestione degli utenti


Routes


authRoutes.js – Gestisce login e registrazione utenti


restaurantRoutes.js – Restituisce l'elenco dei ristoranti


reviewRoutes.js – Gestisce l'aggiunta e la visualizzazione delle recensioni



Dettagli sui File Backend
1. server.js
Configura Express e abilita CORS per permettere richieste dal frontend.


Configura il middleware per il parsing dei dati JSON e URL-encoded.


Gestisce upload di immagini con Multer.


Registra le rotte API per autenticazione, ristoranti e recensioni.


Implementa una gestione centralizzata degli errori.


2. authMiddleware.js
Middleware che controlla la presenza di un token JWT nell'header della richiesta.


Se il token è valido, assegna le informazioni dell'utente a req.user e prosegue.


Se il token è assente o non valido, restituisce un errore 401 Accesso negato.


3. Modelli del Database
restaurantModel.js
Contiene la logica per ottenere tutti i ristoranti dal database (SELECT * FROM ristoranti).


reviewModel.js
Contiene la logica per inserire una nuova recensione nel database.


userModel.js
Contiene la logica per creare un nuovo utente con nome, email, password e ruolo.


4. Rotte API
authRoutes.js
POST /register: Crea un nuovo utente con password criptata con bcrypt.


POST /login: Verifica le credenziali dell'utente e genera un token JWT.


restaurantRoutes.js
GET /: Restituisce l'elenco dei ristoranti dal database.


reviewRoutes.js
POST /: Aggiunge una recensione con upload opzionale di immagine.


GET /:ristorante_id: Restituisce le recensioni di un ristorante specifico.
