// Gestione del login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ottieni i dati dal form di login
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        // Se la risposta è ok, salva il token nel localStorage
        if (res.ok) {
            localStorage.setItem('token', data.token);  // Salva il token
            window.location.href = 'reviews.html';  // Reindirizza alla pagina recensioni
        } else {
            alert('Errore: ' + data.message);  // Mostra un errore
        }
    } catch (error) {
        console.error('Errore durante il login:', error);
        alert('Si è verificato un errore durante il login. Riprova.');
    }
});

// Gestione della registrazione
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ottieni i dati dal form di registrazione
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const ruolo = document.getElementById('ruolo').value;

    try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, password, ruolo })
        });

        const data = await res.json();

        // Se la registrazione è andata a buon fine, salva il token e reindirizza
        if (res.ok) {
            localStorage.setItem('token', data.token);  // Salvataggio del token nel localStorage
            window.location.href = 'reviews.html'; // Reindirizzamento alla pagina recensioni
        } else {
            alert('Errore: ' + data.message);
        }
    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        alert('Si è verificato un errore durante la registrazione. Riprova.');
    }
});
